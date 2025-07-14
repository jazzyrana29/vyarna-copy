import { PaymentIntentNextAction } from '../../../payments/types/payment-intent-next-action';
export declare class ConfirmedPaymentIntentDto {
    success: boolean;
    paymentIntentId: string;
    status: 'REQUIRES_PAYMENT_METHOD' | 'REQUIRES_CONFIRMATION' | 'REQUIRES_ACTION' | 'REQUIRES_CAPTURE' | 'PROCESSING' | 'SUCCEEDED' | 'CANCELED' | 'FAILED';
    clientSecret?: string;
    requiresAction?: boolean;
    nextAction?: PaymentIntentNextAction;
    errorCode?: string;
    errorMessage?: string;
}
