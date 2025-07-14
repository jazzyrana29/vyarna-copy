export declare class ConsumerRewardDto {
    rewardId: string;
    consumerId: string;
    accountId: string;
    sourceType: 'ORDER' | 'REFERRAL' | 'PROMOTION';
    sourceId: string;
    amountCents: number;
    status: 'ISSUED' | 'REDEEMED' | 'EXPIRED';
    issuedAt?: Date;
    redeemedAt?: Date;
    expiredAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
