import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckCouponEligibilityPayloadDto {
  @ApiProperty({ description: 'Coupon code to check' })
  @IsString()
  code: string;
}
