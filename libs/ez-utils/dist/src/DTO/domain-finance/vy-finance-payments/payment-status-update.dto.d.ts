export declare class PaymentStatusUpdateDto {
    sessionId?: string;
    paymentIntentId?: string;
    customerEmail: string;
    status: 'processing' | 'succeeded' | 'failed';
    error?: string;
}
