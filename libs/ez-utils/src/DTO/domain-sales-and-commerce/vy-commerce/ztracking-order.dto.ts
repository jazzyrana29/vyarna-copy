import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, IsDate, IsOptional } from 'class-validator';

export class ZtrackingOrderDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Identifier of the original order', type: 'string', format: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  orderId?: string;

  @ApiProperty({ description: 'Person placing the order', type: 'string', format: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  personId?: string;

  @ApiProperty({ description: 'Total amount in cents', required: false })
  @IsOptional()
  @IsInt()
  totalCents?: number;

  @ApiProperty({ description: 'Order status', required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ description: 'Currency code', required: false })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ description: 'PaymentIntent identifier', required: false })
  @IsOptional()
  @IsString()
  paymentIntentId?: string;

  @ApiProperty({ description: 'Creation timestamp', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Last update timestamp', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ description: 'Date of this version', type: String, format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  versionDate?: Date;
}
