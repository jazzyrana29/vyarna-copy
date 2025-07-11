import {
  ApiProperty,
  PickType,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentIntentDto } from './payment-intent.dto';

export class ShippingAddressDto {
  @ApiProperty({ description: 'Street line for the address' })
  @IsString()
  line1: string;

  @ApiProperty({ description: 'City for the address' })
  @IsString()
  city: string;

  @ApiPropertyOptional({ description: 'State or province' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ description: 'Postal or zip code' })
  @IsString()
  postal_code: string;

  @ApiProperty({ description: 'ISO country code' })
  @IsString()
  country: string;
}

export class ShippingDto {
  @ApiProperty({ description: 'Recipient name' })
  @IsString()
  name: string;

  @ApiProperty({ type: ShippingAddressDto })
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  address: ShippingAddressDto;
}

export class ConfirmPaymentIntentDto extends PickType(
  PaymentIntentDto,
  ['paymentIntentId'] as const,
) {
  @ApiProperty({ description: 'Payment method to use for confirmation' })
  @IsString()
  paymentMethodId: string;

  @ApiPropertyOptional({
    description: 'Email address to send the receipt to',
  })
  @IsOptional()
  @IsEmail()
  receiptEmail?: string;

  @ApiPropertyOptional({ description: 'Return URL after additional auth' })
  @IsOptional()
  @IsString()
  returnUrl?: string;

  @ApiPropertyOptional({
    description: 'Whether payment method is saved for future use',
    enum: ['off_session', 'on_session'],
  })
  @IsOptional()
  @IsIn(['off_session', 'on_session'])
  setupFutureUsage?: 'off_session' | 'on_session';

  @ApiPropertyOptional({ type: ShippingDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ShippingDto)
  shipping?: ShippingDto;
}
