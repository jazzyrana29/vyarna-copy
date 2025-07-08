import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StripeWebhookDto {
  @ApiProperty({ description: 'Raw request body' })
  @IsString()
  payload: string;

  @ApiProperty({ description: 'Stripe signature header' })
  @IsString()
  signature: string;
}
