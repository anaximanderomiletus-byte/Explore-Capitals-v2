/**
 * Payment and subscription constants for ExploreCapitals
 */

// Stripe Price IDs - UPDATE THESE after creating products in Stripe Dashboard
export const STRIPE_PRICES = {
  MONTHLY: 'price_monthly_placeholder', // Replace with actual price ID
  ANNUAL: 'price_annual_placeholder',   // Replace with actual price ID
  LIFETIME: 'price_lifetime_placeholder', // Replace with actual price ID
};

// Payment limits
export const PAYMENT_LIMITS = {
  MIN_AMOUNT: 100,        // $1.00 minimum (in cents)
  MAX_AMOUNT: 10000,      // $100.00 maximum single purchase
  MAX_DAILY: 50000,       // $500.00 daily limit
  MAX_MONTHLY: 200000,    // $2,000.00 monthly limit
};

// Rate limiting
export const RATE_LIMITS = {
  MAX_ATTEMPTS_PER_HOUR: 2,
  MAX_ATTEMPTS_PER_DAY: 5,
  ACCOUNT_MIN_AGE_HOURS: 24,
};

// OFAC-sanctioned countries + high fraud risk
export const BLOCKED_COUNTRIES = [
  // OFAC Sanctioned
  'CU', // Cuba
  'IR', // Iran
  'KP', // North Korea
  'SY', // Syria
  'RU', // Russia
  'BY', // Belarus
  // High fraud risk (optional - uncomment to enable)
  // 'NG', // Nigeria
  // 'GH', // Ghana
];

// Terms version - increment when terms change
export const CURRENT_TERMS_VERSION = '1.0.0';

// Free tier limits
export const FREE_TIER_LIMITS = {
  DAILY_GAMES: 5,
};

// Refund policy
export const REFUND_POLICY = {
  COOLING_PERIOD_HOURS: 24,
  ALLOW_SUBSCRIPTION_REFUNDS: false,
};
