import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { EXPO_STRIPE_PUBLISH_KEY } from '@env';

export async function createEmbeddedPaymentForm(clientSecret: string) {
  const stripe = await loadStripe(EXPO_STRIPE_PUBLISH_KEY);
  if (!stripe) {
    throw new Error('Failed to load Stripe');
  }
  const elements = stripe.elements({ clientSecret });
  const paymentElement = elements.create('payment');
  return { stripe, elements, paymentElement };
}

export async function confirmEmbeddedPayment(
  stripe: Stripe,
  elements: StripeElements,
  returnUrl: string,
) {
  return stripe.confirmPayment({ elements, confirmParams: { return_url: returnUrl } });
}
