import { PaymentIntentDto } from './payment-intent.dto';
export declare class ShippingAddressDto {
    line1: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
}
export declare class ShippingDto {
    name: string;
    address: ShippingAddressDto;
}
declare const ConfirmPaymentIntentDto_base: import("@nestjs/common").Type<Pick<PaymentIntentDto, "paymentIntentId">>;
export declare class ConfirmPaymentIntentDto extends ConfirmPaymentIntentDto_base {
    paymentMethodId: string;
    receiptEmail?: string;
    returnUrl?: string;
    setupFutureUsage?: 'off_session' | 'on_session';
    shipping?: ShippingDto;
}
export {};
