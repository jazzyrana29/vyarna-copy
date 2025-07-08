import { RefundDto } from './refund.dto';
declare const CreateRefundDto_base: import("@nestjs/common").Type<Pick<RefundDto, "paymentIntentId" | "amountCents" | "reason" | "metadata">>;
export declare class CreateRefundDto extends CreateRefundDto_base {
}
export {};
