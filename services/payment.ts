import { httpsCallable, getFunctions } from 'firebase/functions';
import { functions, app } from '../firebase';

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

/**
 * Resolve a working Functions instance.
 * Primary: use the eagerly-initialised export from firebase.ts.
 * Fallback: re-derive from the app instance (handles rare race / init-order issues).
 */
const resolveFunctions = () => {
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

export const createCheckoutSession = async (amountInCents: number) => {
  const fns = resolveFunctions();
  if (!fns) {
    throw new Error('Unable to connect to payment service. Please refresh the page and try again.');
  }

  const createSession = httpsCallable<
    { amount: number; successUrl: string; cancelUrl: string },
    CheckoutSessionResponse
  >(fns, 'createStripeCheckoutSession');

  const { data } = await createSession({
    amount: amountInCents,
    successUrl: `${window.location.origin}/about?success=true`,
    cancelUrl: `${window.location.origin}/about?canceled=true`,
  });

  return data;
};
