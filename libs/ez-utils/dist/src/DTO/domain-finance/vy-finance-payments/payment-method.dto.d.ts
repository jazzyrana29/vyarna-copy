export declare class PaymentMethodDto {
    paymentMethodId: string;
    personId?: string;
    externalId: string;
    type: 'CARD' | 'ACH' | 'APPLE_PAY' | 'GOOGLE_PAY' | 'OTHER';
    details?: Record<string, unknown>;
    isDefault: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
