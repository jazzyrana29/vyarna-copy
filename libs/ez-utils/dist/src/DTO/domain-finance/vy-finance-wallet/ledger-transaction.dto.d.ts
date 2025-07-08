export declare class LedgerTransactionDto {
    transactionId: string;
    accountId: string;
    amountCents: number;
    transactionType: 'PAYOUT' | 'REWARD' | 'COMMISSION' | 'REFUND' | 'ADJUSTMENT';
    relatedType?: string;
    relatedId?: string;
    description?: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    createdAt?: Date;
    updatedAt?: Date;
}
