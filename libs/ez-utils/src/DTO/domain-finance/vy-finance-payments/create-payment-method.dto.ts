import { PickType } from '@nestjs/swagger';
import { PaymentMethodDto } from './payment-method.dto';

export class CreatePaymentMethodDto extends PickType(PaymentMethodDto, [
  'personId',
  'externalId',
  'type',
  'details',
  'isDefault',
] as const) {}

export class CreatePaymentMethodWithStripeDto extends CreatePaymentMethodDto {
  stripeCustomerId?: string;
}
