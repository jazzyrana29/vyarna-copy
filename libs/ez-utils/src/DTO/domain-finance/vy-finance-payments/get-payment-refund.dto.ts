import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetPaymentRefundDto {
  @ApiProperty({ description: 'Refund identifier' })
  @IsUUID()
  refundId: string;
}
