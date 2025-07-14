export declare class SubscriptionEventDto {
    eventId: string;
    subscriptionId: string;
    eventType: "RENEWAL" | "PAYMENT_FAILED" | "CANCELLATION";
    eventTime: Date;
    payload: Record<string, unknown>;
    createdAt?: Date;
    updatedAt?: Date;
}
