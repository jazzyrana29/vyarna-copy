import { PickType } from '@nestjs/swagger';
import { RefundDto } from './refund.dto';

export class CreateRefundDto extends PickType(RefundDto, [
  'paymentIntentId',
  'amountCents',
  'reason',
  'metadata',
] as const) {}
