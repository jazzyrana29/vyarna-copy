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

  @ApiProperty({ description: 'Original payment intent id' })
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

  @ApiProperty({ description: 'Status of the intent' })
  @IsString()
  status: string;

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

  @ApiProperty({ description: 'Version date' })
  @IsDate()
  versionDate: Date;
}
