import { httpsCallable, getFunctions, Functions } from 'firebase/functions';
import { functions, app } from '../firebase';
import type { PaymentEligibility, SubscriptionPlan } from '../types';

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface PortalSessionResponse {
  url: string;
}

export interface EligibilityResponse extends PaymentEligibility {}

/**
 * Resolve a working Functions instance.
 * Primary: use the eagerly-initialised export from firebase.ts.
 * Fallback: re-derive from the app instance (handles rare init-order issues).
 */
const resolveFunctions = (): Functions | null => {
  if (functions) return functions;
  if (app) {
    try {
      return getFunctions(app);
    } catch {
      /* fall through */
    }
  }
  return null;
};

const requireFunctions = (): Functions => {
  const fns = resolveFunctions();
  if (!fns) {
    throw new Error('Unable to connect to payment service. Please refresh the page and try again.');
  }
  return fns;
};

/**
 * Check if user is eligible to make a payment
 */
export const checkPaymentEligibility = async (amount?: number): Promise<EligibilityResponse> => {
  const fns = requireFunctions();

  const checkEligibility = httpsCallable<{ amount?: number }, EligibilityResponse>(
    fns,
    'checkPaymentEligibility'
  );

  const { data } = await checkEligibility({ amount });
  return data;
};

/**
 * Accept terms of service
 */
export const acceptTermsOfService = async (): Promise<{ success: boolean; version: string }> => {
  const fns = requireFunctions();

  const acceptTerms = httpsCallable<void, { success: boolean; version: string }>(
    fns,
    'acceptTerms'
  );

  const { data } = await acceptTerms();
  return data;
};

/**
 * Create a subscription checkout session
 */
export const createSubscriptionCheckout = async (
  plan: SubscriptionPlan
): Promise<CheckoutSessionResponse> => {
  const fns = requireFunctions();

  const createSession = httpsCallable<
    { plan: SubscriptionPlan; successUrl: string; cancelUrl: string },
    CheckoutSessionResponse
  >(fns, 'createSubscriptionSession');

  const { data } = await createSession({
    plan,
    successUrl: `${window.location.origin}/settings?subscription=success`,
    cancelUrl: window.location.href,
  });

  return data;
};

/**
 * Get customer portal URL for managing subscription
 */
export const getCustomerPortalUrl = async (): Promise<string> => {
  const fns = requireFunctions();

  const createPortal = httpsCallable<
    { returnUrl: string; origin: string },
    PortalSessionResponse
  >(fns, 'createCustomerPortalSession');

  const { data } = await createPortal({
    returnUrl: `${window.location.origin}/settings`,
    origin: window.location.origin,
  });

  return data.url;
};

/**
 * Cancel subscription
 */
export const cancelSubscription = async (): Promise<{ success: boolean; message: string }> => {
  const fns = requireFunctions();

  const cancel = httpsCallable<void, { success: boolean; message: string }>(
    fns,
    'cancelSubscription'
  );

  const { data } = await cancel();
  return data;
};

/**
 * Request a refund
 */
export const requestRefund = async (
  paymentIntentId: string
): Promise<{ success: boolean; message: string }> => {
  const fns = requireFunctions();

  const refund = httpsCallable<{ paymentIntentId: string }, { success: boolean; message: string }>(
    fns,
    'requestRefund'
  );

  const { data } = await refund({ paymentIntentId });
  return data;
};

/**
 * Check if user has premium access (active subscription or lifetime)
 */
export const isPremiumUser = (
  subscriptionStatus?: string,
  subscriptionPlan?: string
): boolean => {
  if (subscriptionPlan === 'lifetime') return true;
  return subscriptionStatus === 'active';
};

/**
 * Check if user can play a game (based on daily limit for free users)
 */
export const canPlayGame = (
  isPremium: boolean,
  dailyGamesPlayed: number,
  dailyLimit: number = 5
): { allowed: boolean; remaining: number } => {
  if (isPremium) {
    return { allowed: true, remaining: Infinity };
  }

  const remaining = Math.max(0, dailyLimit - dailyGamesPlayed);
  return {
    allowed: remaining > 0,
    remaining,
  };
};

/**
 * Get subscription plan display info
 */
export const getSubscriptionInfo = (plan?: SubscriptionPlan) => {
  const plans = {
    monthly: {
      name: 'Premium Monthly',
      price: '$5.99/month',
      priceValue: 5.99,
      description: 'Billed monthly, cancel anytime',
    },
    annual: {
      name: 'Premium Annual',
      price: '$49.99/year',
      priceValue: 49.99,
      description: 'Save 30%! Billed annually',
      savings: '~$22 savings',
    },
    lifetime: {
      name: 'Lifetime Access',
      price: '$99.99',
      priceValue: 99.99,
      description: 'One-time payment, forever access',
      badge: 'Best Value',
    },
  };

  return plan ? plans[plan] : plans;
};
