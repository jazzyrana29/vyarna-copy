export declare class WalletAccountDto {
    accountId: string;
    personId: string;
    type: 'PROVIDER' | 'CONSUMER' | 'AFFILIATE' | 'INTERNAL';
    currency: string;
    balanceCents: number;
    createdAt?: Date;
    updatedAt?: Date;
}
