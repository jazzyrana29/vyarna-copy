import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class ValidatePromotionCodeDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customerId?: string;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  cartTotal?: number;
}

export class ValidatePromotionCodeResponseDto {
  @ApiProperty()
  @IsBoolean()
  eligible: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  percentOff?: number;
}
