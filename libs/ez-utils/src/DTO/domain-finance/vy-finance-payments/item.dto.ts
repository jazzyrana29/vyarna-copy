import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min, IsOptional, IsString } from 'class-validator';

export class ItemDto {
  @ApiProperty({ description: 'Internal product ID' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Quantity to purchase', minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Optional Stripe Price ID', required: false })
  @IsOptional()
  @IsString()
  stripePriceId?: string;
}
