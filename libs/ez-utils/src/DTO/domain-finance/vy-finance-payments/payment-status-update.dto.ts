import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID, IsIn } from 'class-validator';

export class PaymentStatusUpdateDto {
  @ApiPropertyOptional({ description: 'Session identifier associated with the payment' })
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @ApiPropertyOptional({ description: 'Payment intent identifier' })
  @IsOptional()
  @IsUUID()
  paymentIntentId?: string;

  @ApiProperty({ description: 'Customer email address' })
  @IsEmail()
  customerEmail: string;

  @ApiProperty({
    description: 'Updated payment status',
    enum: ['processing', 'succeeded', 'failed'],
  })
  @IsString()
  @IsIn(['processing', 'succeeded', 'failed'])
  status: 'processing' | 'succeeded' | 'failed';

  @ApiPropertyOptional({ description: 'Error message in case the update failed' })
  @IsOptional()
  @IsString()
  error?: string;
}
