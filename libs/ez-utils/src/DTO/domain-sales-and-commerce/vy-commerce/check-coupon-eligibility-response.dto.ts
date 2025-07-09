import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CheckCouponEligibilityResponseDto {
  @ApiProperty({ description: 'Indicates if the coupon is eligible' })
  @IsBoolean()
  eligible: boolean;

  @ApiProperty({ description: 'Reason the coupon is not eligible', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}
