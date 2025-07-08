export declare class ProviderPayoutDto {
    payoutId: string;
    providerId: string;
    accountId: string;
    periodStart: string;
    periodEnd: string;
    amountCents: number;
    status: 'SCHEDULED' | 'PROCESSING' | 'PAID' | 'FAILED';
    scheduledAt?: Date;
    paidAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
