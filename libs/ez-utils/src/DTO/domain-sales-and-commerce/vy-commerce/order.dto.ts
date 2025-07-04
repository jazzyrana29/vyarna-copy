import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString } from 'class-validator';

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
}
