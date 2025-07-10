import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsOptional, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { ItemDto } from './item.dto';
import { CustomerDetailsDto } from './customer-details.dto';

export class CreatePaymentIntentPayloadDto {
  @ApiProperty({
    type: [ItemDto],
    description: 'Line items user intends to purchase',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];

  @ApiProperty({
    type: CustomerDetailsDto,
    description: 'Customer contact & shipping/billing data',
  })
  @ValidateNested()
  @Type(() => CustomerDetailsDto)
  customerDetails: CustomerDetailsDto;

  @ApiProperty({
    description: 'Unique idempotency key for retry-safe requests',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(10, 255)
  idempotencyKey?: string;
}
