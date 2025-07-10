import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetPaymentIntentDto {
  @ApiProperty({ description: 'Unique identifier for the payment intent' })
  @IsUUID()
  paymentIntentId: string;
}
