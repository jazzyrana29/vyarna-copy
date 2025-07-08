export declare class AffiliateCommissionDto {
    commissionId: string;
    partnerId: string;
    accountId: string;
    orderId: string;
    amountCents: number;
    status: 'PENDING' | 'PAID' | 'FAILED';
    earnedAt?: Date;
    paidAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
