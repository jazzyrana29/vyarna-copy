import { PickType } from '@nestjs/swagger';
import { PaymentIntentDto } from './payment-intent.dto';

export class GetPaymentIntentDto extends PickType(PaymentIntentDto, [
  'paymentIntentId',
] as const) {}
