import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsOptional,
  IsUUID,
  IsBoolean,
  IsString,
  IsISO4217CurrencyCode,
} from "class-validator";

export class GetProductsDto {
  @ApiPropertyOptional({ format: "uuid" })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({ format: "uuid" })
  @IsOptional()
  @IsUUID()
  productId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  limit?: number;

  @ApiProperty({ description: 'Target currency code (ISO 4217)' })
  @IsISO4217CurrencyCode()
  targetCurrency: string;
}
