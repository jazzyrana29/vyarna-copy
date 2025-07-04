import { PickType } from '@nestjs/swagger';
import { PaymentIntentDto } from './payment-intent.dto';

export class CreatePaymentIntentDto extends PickType(PaymentIntentDto, [
  'orderId',
  'subscriptionId',
  'amountCents',
  'currency',
  'metadata',
] as const) {}
