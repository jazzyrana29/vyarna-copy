import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetPaymentIntentStatusDto {
  @ApiProperty({ description: 'Unique identifier for the payment intent' })
  @IsUUID()
  paymentIntentId: string;
}
