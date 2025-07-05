export declare class ZtrackingPaymentIntentDto {
    ztrackingVersion: string;
    paymentIntentId: string;
    externalId: string;
    amountCents: number;
    currency: string;
    status: string;
    metadata?: Record<string, unknown>;
    orderId?: string;
    subscriptionId?: string;
    nextRetryAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    versionDate: Date;
}
