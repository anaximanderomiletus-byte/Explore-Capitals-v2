/**
 * Payment validation utilities for ExploreCapitals
 */
import * as admin from "firebase-admin";
import { RATE_LIMITS, BLOCKED_COUNTRIES, CURRENT_TERMS_VERSION, PAYMENT_LIMITS } from "./constants";

export interface PaymentEligibilityResult {
  allowed: boolean;
  reason?: string;
  requiresEmailVerification?: boolean;
  requiresTermsAcceptance?: boolean;
}

export interface UserPaymentData {
  emailVerified: boolean;
  joinedAt: admin.firestore.Timestamp | string;
  termsAcceptedAt?: admin.firestore.Timestamp;
  termsVersion?: string;
  paymentAttempts?: Array<{
    timestamp: admin.firestore.Timestamp | string;
    amount: number;
    status: string;
  }>;
}

/**
 * Calculate account age in hours
 */
function getAccountAgeHours(joinedAt: admin.firestore.Timestamp | string): number {
  const joinedDate = typeof joinedAt === 'string' 
    ? new Date(joinedAt) 
    : joinedAt.toDate();
  return (Date.now() - joinedDate.getTime()) / (1000 * 60 * 60);
}

/**
 * Get payment attempts within a time window
 */
/**
 * Safely parse a Firestore timestamp to milliseconds.
 * Handles: Firestore Timestamp objects, serialized {_seconds}, {seconds}, strings, numbers
 */
function toMs(ts: any): number {
  if (!ts) return 0;
  if (typeof ts === 'string') return new Date(ts).getTime();
  if (typeof ts === 'number') return ts;
  if (typeof ts.toDate === 'function') return ts.toDate().getTime();
  if (ts._seconds != null) return ts._seconds * 1000;
  if (ts.seconds != null) return ts.seconds * 1000;
  return 0;
}

function getAttemptsInWindow(
  attempts: UserPaymentData['paymentAttempts'],
  windowMs: number
): number {
  if (!attempts || attempts.length === 0) return 0;
  
  const now = Date.now();
  return attempts.filter(a => {
    const timestamp = toMs(a.timestamp);
    return timestamp > 0 && now - timestamp < windowMs;
  }).length;
}

/**
 * Get total completed payment amount in a time window
 */
function getCompletedAmountInWindow(
  attempts: UserPaymentData['paymentAttempts'],
  windowMs: number
): number {
  if (!attempts || attempts.length === 0) return 0;
  
  const now = Date.now();
  return attempts
    .filter(a => {
      const timestamp = toMs(a.timestamp);
      return a.status === 'completed' && timestamp > 0 && now - timestamp < windowMs;
    })
    .reduce((sum, a) => sum + a.amount, 0);
}

/**
 * Validate if a user is eligible to make a payment
 */
export function validatePaymentEligibility(
  user: UserPaymentData,
  amount?: number
): PaymentEligibilityResult {
  // 1. Email must be verified
  if (!user.emailVerified) {
    return {
      allowed: false,
      reason: "Please verify your email address before making a purchase.",
      requiresEmailVerification: true,
    };
  }

  // 2. Account must be at least 24 hours old
  const accountAgeHours = getAccountAgeHours(user.joinedAt);
  if (accountAgeHours < RATE_LIMITS.ACCOUNT_MIN_AGE_HOURS) {
    const hoursRemaining = Math.ceil(RATE_LIMITS.ACCOUNT_MIN_AGE_HOURS - accountAgeHours);
    return {
      allowed: false,
      reason: `Your account must be at least 24 hours old to make purchases. Please wait ${hoursRemaining} more hour${hoursRemaining === 1 ? '' : 's'}.`,
    };
  }

  // 3. Terms must be accepted (current version)
  if (!user.termsAcceptedAt || user.termsVersion !== CURRENT_TERMS_VERSION) {
    return {
      allowed: false,
      reason: "Please accept the current terms of service before making a purchase.",
      requiresTermsAcceptance: true,
    };
  }

  // 4. Rate limiting - max attempts per hour
  const attemptsLastHour = getAttemptsInWindow(user.paymentAttempts, 60 * 60 * 1000);
  if (attemptsLastHour >= RATE_LIMITS.MAX_ATTEMPTS_PER_HOUR) {
    return {
      allowed: false,
      reason: "Too many payment attempts. Please wait an hour before trying again.",
    };
  }

  // 5. Rate limiting - max attempts per day
  const attemptsLastDay = getAttemptsInWindow(user.paymentAttempts, 24 * 60 * 60 * 1000);
  if (attemptsLastDay >= RATE_LIMITS.MAX_ATTEMPTS_PER_DAY) {
    return {
      allowed: false,
      reason: "Daily payment attempt limit reached. Please try again tomorrow.",
    };
  }

  // 6. Daily spending limit
  if (amount) {
    const dailySpent = getCompletedAmountInWindow(user.paymentAttempts, 24 * 60 * 60 * 1000);
    if (dailySpent + amount > PAYMENT_LIMITS.MAX_DAILY) {
      return {
        allowed: false,
        reason: `Daily spending limit of $${PAYMENT_LIMITS.MAX_DAILY / 100} reached.`,
      };
    }

    // 7. Monthly spending limit
    const monthlySpent = getCompletedAmountInWindow(user.paymentAttempts, 30 * 24 * 60 * 60 * 1000);
    if (monthlySpent + amount > PAYMENT_LIMITS.MAX_MONTHLY) {
      return {
        allowed: false,
        reason: `Monthly spending limit of $${PAYMENT_LIMITS.MAX_MONTHLY / 100} reached.`,
      };
    }
  }

  return { allowed: true };
}

/**
 * Check if a country is blocked
 */
export function isCountryBlocked(countryCode: string): boolean {
  return BLOCKED_COUNTRIES.includes(countryCode.toUpperCase());
}

/**
 * Log a payment attempt to the user's document
 */
export async function logPaymentAttempt(
  userId: string,
  amount: number,
  status: 'initiated' | 'completed' | 'failed' | 'blocked',
  reason?: string
): Promise<void> {
  // Note: Can't use serverTimestamp() inside arrayUnion, so use Timestamp.now()
  const attempt = {
    timestamp: admin.firestore.Timestamp.now(),
    amount,
    status,
    ...(reason && { reason }),
  };

  await admin.firestore().collection("users").doc(userId).update({
    paymentAttempts: admin.firestore.FieldValue.arrayUnion(attempt),
  });
}

/**
 * Clean up old payment attempts (keep last 30 days)
 */
export async function cleanupOldAttempts(userId: string): Promise<void> {
  const userDoc = await admin.firestore().collection("users").doc(userId).get();
  const data = userDoc.data();
  
  if (!data?.paymentAttempts) return;

  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
  const recentAttempts = data.paymentAttempts.filter((a: any) => {
    const timestamp = typeof a.timestamp === 'string'
      ? new Date(a.timestamp).getTime()
      : a.timestamp?.toDate?.()?.getTime() || 0;
    return timestamp > thirtyDaysAgo;
  });

  if (recentAttempts.length !== data.paymentAttempts.length) {
    await admin.firestore().collection("users").doc(userId).update({
      paymentAttempts: recentAttempts,
    });
  }
}
