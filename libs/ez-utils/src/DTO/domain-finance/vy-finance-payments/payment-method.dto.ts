import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsObject, IsBoolean, IsDate } from 'class-validator';

export class PaymentMethodDto {
  @ApiProperty({ description: 'Payment method identifier' })
  @IsUUID()
  paymentMethodId: string;

  @ApiProperty({ description: 'Person identifier', required: false })
  @IsOptional()
  @IsUUID()
  personId?: string;

  @ApiProperty({ description: 'External identifier (vault token)' })
  @IsString()
  externalId: string;

  @ApiProperty({ description: 'Method type', enum: ['CARD','ACH','APPLE_PAY','GOOGLE_PAY','OTHER'] })
  @IsString()
  type: 'CARD' | 'ACH' | 'APPLE_PAY' | 'GOOGLE_PAY' | 'OTHER';

  @ApiProperty({ description: 'Method details', required: false })
  @IsOptional()
  @IsObject()
  details?: Record<string, unknown>;

  @ApiProperty({ description: 'Is default payment method' })
  @IsBoolean()
  isDefault: boolean;

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
