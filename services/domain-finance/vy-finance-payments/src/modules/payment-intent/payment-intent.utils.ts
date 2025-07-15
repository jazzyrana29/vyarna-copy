import Stripe from 'stripe';
import { PaymentIntent } from '../../entities/payment_intent.entity';

export const mapStripeIntentStatus = (
  status: Stripe.PaymentIntent.Status | 'requires_capture' | 'payment_failed',
): PaymentIntent['status'] | 'REQUIRES_CAPTURE' | 'FAILED' => {
  const map: Record<string, PaymentIntent['status'] | 'REQUIRES_CAPTURE' | 'FAILED'> = {
    requires_payment_method: 'REQUIRES_PAYMENT_METHOD',
    requires_confirmation: 'REQUIRES_CONFIRMATION',
    requires_action: 'REQUIRES_ACTION',
    requires_capture: 'REQUIRES_CAPTURE',
    processing: 'PROCESSING',
    succeeded: 'SUCCEEDED',
    canceled: 'CANCELED',
    payment_failed: 'FAILED',
  };
  return map[status] ?? 'REQUIRES_PAYMENT_METHOD';
};
