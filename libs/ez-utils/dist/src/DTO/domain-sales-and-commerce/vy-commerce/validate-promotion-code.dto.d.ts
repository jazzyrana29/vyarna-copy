export declare class ValidatePromotionCodeDto {
    code: string;
    customerId?: string;
    cartTotal?: number;
}
export declare class ValidatePromotionCodeResponseDto {
    eligible: boolean;
    reason?: string;
    discountAmount?: number;
    percentOff?: number;
}
