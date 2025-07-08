import { PickType } from '@nestjs/swagger';
import { RefundDto } from './refund.dto';

export class GetPaymentRefundDto extends PickType(RefundDto, ['refundId'] as const) {}
