import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AppliedCouponDto {
  @ApiProperty({ description: 'Coupon ID applied' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Product ID this coupon applied to' })
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'Total discount amount in cents' })
  @IsInt()
  discountAmount: number;
}

export class PaymentIntentCreatedDto {
  @ApiProperty({ description: 'Was the creation successful?' })
  @IsBoolean()
  success: boolean;

  @ApiProperty({ description: 'Stripe client_secret for front-end confirm' })
  @IsString()
  clientSecret: string;

  @ApiProperty({ description: 'Internal payment intent UUID' })
  @IsUUID()
  paymentIntentId: string;

  @ApiProperty({
    type: [AppliedCouponDto],
    description: 'Coupons applied and their discount amounts',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AppliedCouponDto)
  appliedCoupons: AppliedCouponDto[];

  @ApiProperty({ description: 'Final amount charged (in cents)' })
  @IsInt()
  totalAmount: number;

  @ApiProperty({ description: 'Original amount before discounts (in cents)' })
  @IsInt()
  originalAmount: number;

  @ApiProperty({
    description: 'Unit for amount values, e.g. cents',
  })
  @IsString()
  amountUnit: string;
}
