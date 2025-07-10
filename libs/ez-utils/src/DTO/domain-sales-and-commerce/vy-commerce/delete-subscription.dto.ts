import { PickType } from '@nestjs/swagger';
import { SubscriptionDto } from './subscription.dto';

export class DeleteSubscriptionDto extends PickType(SubscriptionDto, ['subscriptionId'] as const) {}
