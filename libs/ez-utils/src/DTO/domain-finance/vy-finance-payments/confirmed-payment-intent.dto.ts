import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import {
  PaymentIntentNextAction,
} from '../../../payments/types/payment-intent-next-action';

export class ConfirmedPaymentIntentDto {
  @ApiProperty({ description: 'Whether the confirmation was successful' })
  @IsBoolean()
  success: boolean;

  @ApiProperty({ description: 'Internal payment intent identifier' })
  @IsUUID()
  paymentIntentId: string;

  @ApiProperty({
    description: 'Final status of the payment intent',
    enum: [
      'REQUIRES_PAYMENT_METHOD',
      'REQUIRES_CONFIRMATION',
      'REQUIRES_ACTION',
      'REQUIRES_CAPTURE',
      'PROCESSING',
      'SUCCEEDED',
      'CANCELED',
      'FAILED',
    ],
  })
  @IsString()
  status:
    | 'REQUIRES_PAYMENT_METHOD'
    | 'REQUIRES_CONFIRMATION'
    | 'REQUIRES_ACTION'
    | 'REQUIRES_CAPTURE'
    | 'PROCESSING'
    | 'SUCCEEDED'
    | 'CANCELED'
    | 'FAILED';

  @ApiPropertyOptional({ description: 'Updated client secret' })
  @IsOptional()
  @IsString()
  clientSecret?: string;

  @ApiPropertyOptional({ description: 'Whether further action is required' })
  @IsOptional()
  @IsBoolean()
  requiresAction?: boolean;

  @ApiPropertyOptional({ description: 'Next action information from Stripe' })
  @IsOptional()
  nextAction?: PaymentIntentNextAction;

  @ApiPropertyOptional({ description: 'Stripe error code when failed' })
  @IsOptional()
  @IsString()
  errorCode?: string;

  @ApiPropertyOptional({ description: 'Stripe error message when failed' })
  @IsOptional()
  @IsString()
  errorMessage?: string;
}
