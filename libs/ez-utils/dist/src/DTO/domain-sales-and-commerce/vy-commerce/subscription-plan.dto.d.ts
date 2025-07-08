export declare class SubscriptionPlanDto {
    planId: string;
    name: string;
    description?: string;
    priceCents: number;
    currency: string;
    interval: "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY";
    intervalCount: number;
    trialPeriodDays?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
