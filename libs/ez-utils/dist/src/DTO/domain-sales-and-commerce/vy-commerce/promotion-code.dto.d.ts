export declare class PromotionCodeDto {
    promoId: string;
    code: string;
    discountType: "PERCENTAGE" | "AMOUNT";
    value: number;
    validFrom: Date;
    validTo: Date;
    maxRedemptions: number;
    createdAt?: Date;
    updatedAt?: Date;
}
