import { PickType } from '@nestjs/swagger';
import { PaymentIntentDto } from './payment-intent.dto';

export class GetPaymentIntentsDto extends PickType(PaymentIntentDto, [
  'externalId',
] as const) {}
