import { PaymentIntentDto } from './payment-intent.dto';
declare const CreatePaymentIntentDto_base: import("@nestjs/common").Type<Pick<PaymentIntentDto, "amountCents" | "currency" | "metadata" | "orderId" | "subscriptionId">>;
export declare class CreatePaymentIntentDto extends CreatePaymentIntentDto_base {
}
export {};
