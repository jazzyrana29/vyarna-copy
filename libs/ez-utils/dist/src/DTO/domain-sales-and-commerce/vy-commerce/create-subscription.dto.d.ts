import { SubscriptionDto } from './subscription.dto';
import { SubscriptionItemDto } from './subscription-item.dto';
declare const CreateSubscriptionDto_base: import("@nestjs/common").Type<Pick<SubscriptionDto, "personId" | "planId">>;
export declare class CreateSubscriptionDto extends CreateSubscriptionDto_base {
    items: SubscriptionItemDto[];
}
export {};
