import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsInt,
  IsOptional,
  IsObject,
  IsDate,
} from 'class-validator';

export class ZtrackingPaymentIntentDto {
  @ApiProperty({ description: 'Version identifier' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Original payment intent id', required: false })
  @IsOptional()
  @IsUUID()
  paymentIntentId?: string;

  @ApiProperty({ description: 'External id for idempotency', required: false })
  @IsOptional()
  @IsString()
  externalId?: string;

  @ApiProperty({ description: 'Amount in cents', required: false })
  @IsOptional()
  @IsInt()
  amountCents?: number;

  @ApiProperty({ description: 'Currency code', required: false })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ description: 'Status of the intent', required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ description: 'Optional metadata', required: false })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @ApiProperty({ description: 'Order identifier', required: false })
  @IsOptional()
  @IsUUID()
  orderId?: string;

  @ApiProperty({ description: 'Subscription identifier', required: false })
  @IsOptional()
  @IsUUID()
  subscriptionId?: string;

  @ApiProperty({ description: 'Next retry at', required: false, type: String, format: 'date-time' })
  @IsOptional()
  @IsDate()
  nextRetryAt?: Date;

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ description: 'Version date', required: false })
  @IsOptional()
  @IsDate()
  versionDate?: Date;
}
