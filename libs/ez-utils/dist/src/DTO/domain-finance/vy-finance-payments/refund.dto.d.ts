export declare class RefundDto {
    refundId: string;
    paymentIntentId: string;
    externalId: string;
    amountCents: number;
    currency: string;
    status: 'PENDING' | 'SUCCEEDED' | 'FAILED';
    reason?: 'REQUESTED_BY_CUSTOMER' | 'FRAUD' | 'OTHER';
    metadata?: Record<string, unknown>;
    createdAt?: Date;
    updatedAt?: Date;
}
