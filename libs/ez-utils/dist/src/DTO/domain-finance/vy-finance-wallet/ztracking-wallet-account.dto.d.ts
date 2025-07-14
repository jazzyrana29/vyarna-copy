export declare class ZtrackingWalletAccountDto {
    ztrackingVersion: string;
    accountId: string;
    personId: string;
    balanceCents: number;
    type: 'PROVIDER' | 'CONSUMER' | 'AFFILIATE' | 'INTERNAL';
    currency: string;
    createdAt?: Date;
    updatedAt?: Date;
    versionDate: Date;
}
