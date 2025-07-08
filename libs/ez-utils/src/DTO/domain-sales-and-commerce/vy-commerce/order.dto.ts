import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, IsOptional, IsDate } from 'class-validator';

export class OrderDto {
  @ApiProperty({ description: 'Unique identifier', required: true })
  @IsUUID()
  orderId: string;

  @ApiProperty({ description: 'Person placing the order', required: true })
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
}
