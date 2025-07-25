import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsInt,
} from "class-validator";

export class ProductDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  productId: string;

  @ApiProperty({ description: "Product name" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Product description", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: "Whether product is active" })
  @IsBoolean()
  active: boolean;

  @ApiProperty({ description: "Price in cents" })
  @IsInt()
  priceCents: number;

  @ApiProperty({ description: "Currency code" })
  @IsString()
  currency: string;

  @ApiProperty({ description: "Creation timestamp", required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: "Last update timestamp", required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
