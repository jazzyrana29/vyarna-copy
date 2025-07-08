export declare class SubscriptionDto {
    subscriptionId: string;
    personId: string;
    planId: string;
    status: "PENDING" | "ACTIVE" | "PAUSED" | "CANCELLED";
    startDate: Date;
    nextBillingDate: Date;
    canceledAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
