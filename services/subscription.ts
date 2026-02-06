import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';
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
 * Check if user is eligible to make a payment
 */
export const checkPaymentEligibility = async (amount?: number): Promise<EligibilityResponse> => {
  if (!functions) {
    throw new Error('Firebase Functions not initialized');
  }

  const checkEligibility = httpsCallable<{ amount?: number }, EligibilityResponse>(
    functions,
    'checkPaymentEligibility'
  );

  const { data } = await checkEligibility({ amount });
  return data;
};

/**
 * Accept terms of service
 */
export const acceptTermsOfService = async (): Promise<{ success: boolean; version: string }> => {
  if (!functions) {
    throw new Error('Firebase Functions not initialized');
  }

  const acceptTerms = httpsCallable<void, { success: boolean; version: string }>(
    functions,
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
  if (!functions) {
    throw new Error('Firebase Functions not initialized');
  }

  const createSession = httpsCallable<
    { plan: SubscriptionPlan; successUrl: string; cancelUrl: string },
    CheckoutSessionResponse
  >(functions, 'createSubscriptionSession');

  const { data } = await createSession({
    plan,
    successUrl: `${window.location.origin}/#/settings?subscription=success`,
    cancelUrl: window.location.href,
  });

  return data;
};

/**
 * Get customer portal URL for managing subscription
 */
export const getCustomerPortalUrl = async (): Promise<string> => {
  if (!functions) {
    throw new Error('Firebase Functions not initialized');
  }

  const createPortal = httpsCallable<
    { returnUrl: string; origin: string },
    PortalSessionResponse
  >(functions, 'createCustomerPortalSession');

  const { data } = await createPortal({
    returnUrl: `${window.location.origin}/#/settings`,
    origin: window.location.origin,
  });

  return data.url;
};

/**
 * Cancel subscription
 */
export const cancelSubscription = async (): Promise<{ success: boolean; message: string }> => {
  if (!functions) {
    throw new Error('Firebase Functions not initialized');
  }

  const cancel = httpsCallable<void, { success: boolean; message: string }>(
    functions,
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
  if (!functions) {
    throw new Error('Firebase Functions not initialized');
  }

  const refund = httpsCallable<{ paymentIntentId: string }, { success: boolean; message: string }>(
    functions,
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
