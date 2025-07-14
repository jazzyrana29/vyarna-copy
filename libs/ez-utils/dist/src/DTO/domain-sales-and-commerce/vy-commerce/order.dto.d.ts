export declare class OrderDto {
    orderId: string;
    personId: string;
    totalCents: number;
    status: string;
    currency: string;
    paymentIntentId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
