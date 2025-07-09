export declare class PaymentAttemptDto {
    attemptId: string;
    paymentIntentId: string;
    attemptNumber: number;
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
    errorCode?: string;
    errorMessage?: string;
    gatewayResponse?: Record<string, unknown>;
    createdAt?: Date;
    updatedAt?: Date;
}
