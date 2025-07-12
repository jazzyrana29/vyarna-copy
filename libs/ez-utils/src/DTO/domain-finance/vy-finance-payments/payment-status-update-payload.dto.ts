export interface PaymentStatusUpdatePayload {
  sessionId?: string;
  paymentIntentId?: string;
  customerEmail: string;
  status: 'processing' | 'succeeded' | 'failed';
  error?: string;
}
