import { PickType } from '@nestjs/swagger';
import { SubscriptionDto } from './subscription.dto';

export class CancelSubscriptionDto extends PickType(SubscriptionDto, ['subscriptionId'] as const) {}
