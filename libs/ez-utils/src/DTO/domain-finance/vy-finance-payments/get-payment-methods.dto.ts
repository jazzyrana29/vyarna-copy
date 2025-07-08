import { PickType } from '@nestjs/swagger';
import { PaymentMethodDto } from './payment-method.dto';

export class GetPaymentMethodsDto extends PickType(PaymentMethodDto, [
  'personId',
] as const) {}
