export declare class PaymentIntentDto {
    paymentIntentId: string;
    externalId: string;
    amountCents: number;
    currency: string;
    status: 'REQUIRES_PAYMENT_METHOD' | 'REQUIRES_CONFIRMATION' | 'PROCESSING' | 'SUCCEEDED' | 'REQUIRES_ACTION' | 'FAILED' | 'CANCELED';
    metadata?: Record<string, unknown>;
    orderId?: string;
    subscriptionId?: string;
    nextRetryAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
