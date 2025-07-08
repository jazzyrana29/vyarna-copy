import { ApiProperty } from '@nestjs/swagger';
import { PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { SubscriptionDto } from './subscription.dto';
import { SubscriptionItemDto } from './subscription-item.dto';

export class CreateSubscriptionDto extends PickType(SubscriptionDto, ['personId', 'planId'] as const) {
  @ApiProperty({ type: [SubscriptionItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubscriptionItemDto)
  items: SubscriptionItemDto[];
}
