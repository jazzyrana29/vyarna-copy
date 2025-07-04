import { PickType } from '@nestjs/swagger';
import { PaymentIntentDto } from './payment-intent.dto';

export class GetZtrackingPaymentIntentDto extends PickType(PaymentIntentDto, [
  'paymentIntentId',
] as const) {}
