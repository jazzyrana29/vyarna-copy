import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, IsDate, IsOptional } from 'class-validator';

export class ZtrackingOrderDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Identifier of the original order', type: 'string', format: 'uuid' })
  @IsUUID()
  orderId: string;

  @ApiProperty({ description: 'Person placing the order', type: 'string', format: 'uuid' })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Total amount in cents' })
  @IsInt()
  totalCents: number;

  @ApiProperty({ description: 'Order status' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Currency code' })
  @IsString()
  currency: string;

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

  @ApiProperty({ description: 'Date of this version', type: String, format: 'date-time' })
  @IsDate()
  versionDate: Date;
}
