import { PickType } from '@nestjs/swagger';
import { SubscriptionDto } from './subscription.dto';

export class GetSubscriptionDto extends PickType(SubscriptionDto, ['subscriptionId'] as const) {}
