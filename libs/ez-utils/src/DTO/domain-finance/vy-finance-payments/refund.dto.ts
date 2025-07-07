import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, IsOptional, IsObject, IsDate } from 'class-validator';

export class RefundDto {
  @ApiProperty({ description: 'Refund identifier' })
  @IsUUID()
  refundId: string;

  @ApiProperty({ description: 'Associated payment intent id' })
  @IsUUID()
  paymentIntentId: string;

  @ApiProperty({ description: 'External id for idempotency' })
  @IsString()
  externalId: string;

  @ApiProperty({ description: 'Amount in cents' })
  @IsInt()
  amountCents: number;

  @ApiProperty({ description: 'Currency code' })
  @IsString()
  currency: string;

  @ApiProperty({ description: 'Status of the refund', enum: ['PENDING','SUCCEEDED','FAILED'] })
  @IsString()
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED';

  @ApiProperty({ description: 'Reason for the refund', required: false, enum: ['REQUESTED_BY_CUSTOMER','FRAUD','OTHER'] })
  @IsOptional()
  @IsString()
  reason?: 'REQUESTED_BY_CUSTOMER' | 'FRAUD' | 'OTHER';

  @ApiProperty({ description: 'Optional metadata', required: false })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
