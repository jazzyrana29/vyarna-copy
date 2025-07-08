export declare class CartDto {
    cartId: string;
    personId: string;
    status: "ACTIVE" | "CHECKED_OUT";
    affiliateCode?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
