import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import { 
  validatePaymentEligibility, 
  logPaymentAttempt,
  cleanupOldAttempts 
} from "./validation";
import { 
  STRIPE_PRICES, 
  PAYMENT_LIMITS, 
  CURRENT_TERMS_VERSION,
  REFUND_POLICY 
} from "./constants";

admin.initializeApp();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

// ============================================
// PAYMENT ELIGIBILITY CHECK
// ============================================

/**
 * Check if user is eligible to make a payment (frontend pre-check)
 */
export const checkPaymentEligibility = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be authenticated.");
  }

  const userId = context.auth.uid;
  const userDoc = await admin.firestore().collection("users").doc(userId).get();
  const userData = userDoc.data();

  if (!userData) {
    throw new functions.https.HttpsError("not-found", "User profile not found.");
  }

  const eligibility = validatePaymentEligibility({
    emailVerified: context.auth.token.email_verified || false,
    joinedAt: userData.joinedAt,
    termsAcceptedAt: userData.termsAcceptedAt,
    termsVersion: userData.termsVersion,
    paymentAttempts: userData.paymentAttempts,
  }, data.amount);

  return eligibility;
});

/**
 * Accept terms of service
 */
export const acceptTerms = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be authenticated.");
  }

  const userId = context.auth.uid;
  
  await admin.firestore().collection("users").doc(userId).update({
    termsAcceptedAt: admin.firestore.FieldValue.serverTimestamp(),
    termsVersion: CURRENT_TERMS_VERSION,
    privacyAcceptedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { success: true, version: CURRENT_TERMS_VERSION };
});

// ============================================
// ONE-TIME DONATION CHECKOUT
// ============================================

/**
 * Create a Stripe Checkout Session for a donation.
 * Expected data: { amount: number, successUrl: string, cancelUrl: string }
 * amount is in cents (e.g., 500 for $5.00)
 * 
 * NOTE: This function allows unauthenticated donations to lower the barrier for support.
 * Authenticated users will get their supporter status updated via webhook.
 */
export const createStripeCheckoutSession = functions.https.onCall(async (data, context) => {
  const { amount, successUrl, cancelUrl } = data;
  
  // User info (optional - donations don't require authentication)
  const userId = context.auth?.uid;
  const userEmail = context.auth?.token.email;

  // Validate amount
  if (!amount || isNaN(amount) || amount < PAYMENT_LIMITS.MIN_AMOUNT) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Amount must be at least $${PAYMENT_LIMITS.MIN_AMOUNT / 100}.`
    );
  }

  if (amount > PAYMENT_LIMITS.MAX_AMOUNT) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Amount cannot exceed $${PAYMENT_LIMITS.MAX_AMOUNT / 100}.`
    );
  }

  // Only validate eligibility for authenticated users
  if (userId) {
    const userDoc = await admin.firestore().collection("users").doc(userId).get();
    const userData = userDoc.data();

    if (userData) {
      const emailVerified = context.auth?.token.email_verified || false;
      const eligibility = validatePaymentEligibility({
        emailVerified,
        joinedAt: userData.joinedAt,
        termsAcceptedAt: userData.termsAcceptedAt,
        termsVersion: userData.termsVersion,
        paymentAttempts: userData.paymentAttempts,
      }, amount);

      if (!eligibility.allowed) {
        await logPaymentAttempt(userId, amount, 'blocked', eligibility.reason);
        throw new functions.https.HttpsError("failed-precondition", eligibility.reason || "Payment not allowed.");
      }
    }

    // Log payment attempt for authenticated users
    await logPaymentAttempt(userId, amount, 'initiated');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation to ExploreCapitals",
              description: "Thank you for supporting our educational games!",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      // Only set customer_email if user is authenticated
      ...(userEmail && { customer_email: userEmail }),
      metadata: {
        // Include userId if authenticated (for supporter badge)
        ...(userId && { userId }),
        type: "donation",
      },
      // Enable 3D Secure for fraud protection
      payment_intent_data: {
        setup_future_usage: undefined,
      },
    });

    return { sessionId: session.id, url: session.url };
  } catch (error: any) {
    console.error("Stripe error:", error);
    if (userId) {
      await logPaymentAttempt(userId, amount, 'failed', error.message);
    }
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// ============================================
// SUBSCRIPTION CHECKOUT
// ============================================

/**
 * Create a Stripe Checkout Session for subscription.
 * Expected data: { plan: 'monthly' | 'annual' | 'lifetime', successUrl: string, cancelUrl: string }
 */
export const createSubscriptionSession = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const { plan, successUrl, cancelUrl } = data;
  const userId = context.auth.uid;
  const userEmail = context.auth.token.email;
  const emailVerified = context.auth.token.email_verified || false;

  // Validate plan
  const validPlans = ['monthly', 'annual', 'lifetime'];
  if (!validPlans.includes(plan)) {
    throw new functions.https.HttpsError("invalid-argument", "Invalid subscription plan.");
  }

  // Get price ID
  const priceId = plan === 'monthly' ? STRIPE_PRICES.MONTHLY
    : plan === 'annual' ? STRIPE_PRICES.ANNUAL
    : STRIPE_PRICES.LIFETIME;

  // Get user data for validation
  const userDoc = await admin.firestore().collection("users").doc(userId).get();
  const userData = userDoc.data();

  if (!userData) {
    throw new functions.https.HttpsError("not-found", "User profile not found.");
  }

  // Check if already subscribed
  if (userData.subscriptionStatus === 'active') {
    throw new functions.https.HttpsError(
      "already-exists",
      "You already have an active subscription. Please manage it in your account settings."
    );
  }

  // Validate payment eligibility
  const eligibility = validatePaymentEligibility({
    emailVerified,
    joinedAt: userData.joinedAt,
    termsAcceptedAt: userData.termsAcceptedAt,
    termsVersion: userData.termsVersion,
    paymentAttempts: userData.paymentAttempts,
  });

  if (!eligibility.allowed) {
    await logPaymentAttempt(userId, 0, 'blocked', eligibility.reason);
    throw new functions.https.HttpsError("failed-precondition", eligibility.reason || "Payment not allowed.");
  }

  // Log payment attempt
  await logPaymentAttempt(userId, 0, 'initiated');

  try {
    // Get or create Stripe customer
    let customerId = userData.stripeCustomerId;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: { userId },
      });
      customerId = customer.id;
      
      await admin.firestore().collection("users").doc(userId).update({
        stripeCustomerId: customerId,
      });
    }

    // Lifetime is a one-time payment, others are subscriptions
    const isLifetime = plan === 'lifetime';
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: isLifetime ? "payment" : "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        type: "subscription",
        plan,
      },
      subscription_data: isLifetime ? undefined : {
        metadata: { userId, plan },
      },
      // Require billing address for fraud prevention
      billing_address_collection: 'required',
    });

    return { sessionId: session.id, url: session.url };
  } catch (error: any) {
    console.error("Stripe error:", error);
    await logPaymentAttempt(userId, 0, 'failed', error.message);
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// ============================================
// SUBSCRIPTION MANAGEMENT
// ============================================

/**
 * Get customer portal URL for managing subscription
 */
export const createCustomerPortalSession = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be authenticated.");
  }

  const userId = context.auth.uid;
  const userDoc = await admin.firestore().collection("users").doc(userId).get();
  const userData = userDoc.data();

  if (!userData?.stripeCustomerId) {
    throw new functions.https.HttpsError("not-found", "No subscription found.");
  }

  const { returnUrl } = data;

  const session = await stripe.billingPortal.sessions.create({
    customer: userData.stripeCustomerId,
    return_url: returnUrl || `${data.origin}/settings`,
  });

  return { url: session.url };
});

/**
 * Cancel subscription immediately
 */
export const cancelSubscription = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be authenticated.");
  }

  const userId = context.auth.uid;
  const userDoc = await admin.firestore().collection("users").doc(userId).get();
  const userData = userDoc.data();

  if (!userData?.subscriptionId) {
    throw new functions.https.HttpsError("not-found", "No active subscription found.");
  }

  try {
    // Cancel at period end (user keeps access until then)
    await stripe.subscriptions.update(userData.subscriptionId, {
      cancel_at_period_end: true,
    });

    await admin.firestore().collection("users").doc(userId).update({
      subscriptionStatus: 'canceled',
    });

    return { success: true, message: "Subscription will cancel at the end of the billing period." };
  } catch (error: any) {
    console.error("Cancel error:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// ============================================
// REFUND REQUEST
// ============================================

/**
 * Request a refund (within 24-hour cooling period, one-time purchases only)
 */
export const requestRefund = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be authenticated.");
  }

  const { paymentIntentId } = data;
  const userId = context.auth.uid;

  if (!paymentIntentId) {
    throw new functions.https.HttpsError("invalid-argument", "Payment ID required.");
  }

  try {
    // Get payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Verify this payment belongs to the user
    if (paymentIntent.metadata?.userId !== userId) {
      throw new functions.https.HttpsError("permission-denied", "This payment does not belong to you.");
    }

    // Check if it's a subscription payment (not refundable)
    if (paymentIntent.metadata?.type === 'subscription' && !REFUND_POLICY.ALLOW_SUBSCRIPTION_REFUNDS) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Subscription payments cannot be refunded. Please cancel your subscription instead."
      );
    }

    // Check cooling period
    const createdAt = paymentIntent.created * 1000; // Convert to milliseconds
    const hoursSincePurchase = (Date.now() - createdAt) / (1000 * 60 * 60);

    if (hoursSincePurchase > REFUND_POLICY.COOLING_PERIOD_HOURS) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        `Refunds are only available within ${REFUND_POLICY.COOLING_PERIOD_HOURS} hours of purchase.`
      );
    }

    // Process refund
    await stripe.refunds.create({
      payment_intent: paymentIntentId,
    });

    // If it was a donation, remove supporter status
    if (paymentIntent.metadata?.type === 'donation') {
      await admin.firestore().collection("users").doc(userId).update({
        isSupporter: false,
        supporterSince: admin.firestore.FieldValue.delete(),
      });
    }

    return { success: true, message: "Refund processed successfully." };
  } catch (error: any) {
    if (error instanceof functions.https.HttpsError) throw error;
    console.error("Refund error:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// ============================================
// STRIPE WEBHOOK HANDLER
// ============================================

/**
 * Handle Stripe Webhooks to update user status upon successful payment.
 */
export const handleStripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      console.error("Missing signature or webhook secret");
      res.status(400).send("Webhook Error: Missing config");
      return;
    }
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Signature Verification Failed: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log(`Processing webhook: ${event.type}`);

  try {
    switch (event.type) {
      // -------- Checkout Completed --------
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        
        if (!userId) {
          console.error("No userId in session metadata");
          break;
        }

        // Log successful payment
        await logPaymentAttempt(userId, session.amount_total || 0, 'completed');

        // Handle donation
        if (session.metadata?.type === "donation") {
          await admin.firestore().collection("users").doc(userId).update({
            isSupporter: true,
            supporterSince: admin.firestore.FieldValue.serverTimestamp(),
          });
          console.log(`User ${userId} marked as supporter.`);
        }

        // Handle lifetime subscription (one-time payment)
        if (session.metadata?.type === "subscription" && session.metadata?.plan === "lifetime") {
          await admin.firestore().collection("users").doc(userId).update({
            subscriptionStatus: 'active',
            subscriptionPlan: 'lifetime',
            currentPeriodEnd: null, // Lifetime has no end
          });
          console.log(`User ${userId} granted lifetime premium.`);
        }
        break;
      }

      // -------- Subscription Created --------
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;
        
        if (!userId) {
          console.error("No userId in subscription metadata");
          break;
        }

        const plan = subscription.metadata?.plan as 'monthly' | 'annual' || 'monthly';
        const status = subscription.status === 'active' || subscription.status === 'trialing'
          ? 'active'
          : subscription.cancel_at_period_end
            ? 'canceled'
            : subscription.status === 'past_due'
              ? 'past_due'
              : 'none';

        await admin.firestore().collection("users").doc(userId).update({
          subscriptionStatus: status,
          subscriptionPlan: plan,
          subscriptionId: subscription.id,
          currentPeriodEnd: admin.firestore.Timestamp.fromMillis(subscription.current_period_end * 1000),
        });
        console.log(`User ${userId} subscription updated: ${status} (${plan})`);
        break;
      }

      // -------- Subscription Deleted --------
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;
        
        if (!userId) {
          console.error("No userId in subscription metadata");
          break;
        }

        await admin.firestore().collection("users").doc(userId).update({
          subscriptionStatus: 'none',
          subscriptionPlan: admin.firestore.FieldValue.delete(),
          subscriptionId: admin.firestore.FieldValue.delete(),
          currentPeriodEnd: admin.firestore.FieldValue.delete(),
        });
        console.log(`User ${userId} subscription deleted.`);
        break;
      }

      // -------- Payment Failed --------
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        
        // Find user by Stripe customer ID
        const usersSnapshot = await admin.firestore()
          .collection("users")
          .where("stripeCustomerId", "==", customerId)
          .limit(1)
          .get();

        if (!usersSnapshot.empty) {
          const userDoc = usersSnapshot.docs[0];
          await userDoc.ref.update({
            subscriptionStatus: 'past_due',
          });
          console.log(`User ${userDoc.id} subscription marked as past_due.`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    // Don't return 500 for processing errors to avoid Stripe retries
  }

  res.json({ received: true });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Cleanup old payment attempts (scheduled function - run daily)
 */
export const cleanupPaymentAttempts = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    const usersSnapshot = await admin.firestore()
      .collection("users")
      .where("paymentAttempts", "!=", null)
      .get();

    let cleanupCount = 0;

    for (const doc of usersSnapshot.docs) {
      await cleanupOldAttempts(doc.id);
      cleanupCount++;
    }

    console.log(`Cleaned up payment attempts for ${cleanupCount} users.`);
    return null;
  });
