import { PickType } from '@nestjs/swagger';
import { PaymentMethodDto } from './payment-method.dto';

export class DeletePaymentMethodDto extends PickType(PaymentMethodDto, [
  'paymentMethodId',
] as const) {}
