import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min, IsString } from 'class-validator';

export class ItemDto {
  @ApiProperty({ description: 'Internal product ID' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Quantity to purchase', minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Unit price in cents' })
  @IsInt()
  priceCents: number;

  @ApiProperty({ description: 'Currency code (ISO 4217)' })
  @IsString()
  currency: string;
}
