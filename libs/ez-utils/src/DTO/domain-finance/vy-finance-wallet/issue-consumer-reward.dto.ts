import { PickType } from '@nestjs/swagger';
import { ConsumerRewardDto } from './consumer-reward.dto';

export class IssueConsumerRewardDto extends PickType(ConsumerRewardDto, [
  'consumerId',
  'accountId',
  'sourceType',
  'sourceId',
  'amountCents',
] as const) {}
