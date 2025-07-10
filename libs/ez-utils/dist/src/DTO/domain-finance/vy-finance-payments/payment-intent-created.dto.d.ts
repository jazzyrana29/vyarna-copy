export declare class AppliedCouponDto {
    id: string;
    productId: string;
    discountAmount: number;
}
export declare class PaymentIntentCreatedDto {
    success: boolean;
    clientSecret: string;
    paymentIntentId: string;
    appliedCoupons: AppliedCouponDto[];
    totalAmount: number;
    originalAmount: number;
    amountUnit: string;
}
