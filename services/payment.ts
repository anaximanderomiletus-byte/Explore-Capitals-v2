import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export const createCheckoutSession = async (amountInCents: number) => {
  if (!functions) {
    throw new Error('Unable to connect to payment service. Please refresh the page and try again.');
  }

  const createSession = httpsCallable<
    { amount: number; successUrl: string; cancelUrl: string },
    CheckoutSessionResponse
  >(functions, 'createStripeCheckoutSession');

  const { data } = await createSession({
    amount: amountInCents,
    successUrl: `${window.location.origin}/about?success=true`,
    cancelUrl: `${window.location.origin}/about?canceled=true`,
  });

  return data;
};
