import { PaymentMethodDto } from './payment-method.dto';
declare const CreatePaymentMethodDto_base: import("@nestjs/common").Type<Pick<PaymentMethodDto, "personId" | "externalId" | "type" | "details" | "isDefault">>;
export declare class CreatePaymentMethodDto extends CreatePaymentMethodDto_base {
}
export declare class CreatePaymentMethodWithStripeDto extends CreatePaymentMethodDto {
    stripeCustomerId?: string;
}
export {};
