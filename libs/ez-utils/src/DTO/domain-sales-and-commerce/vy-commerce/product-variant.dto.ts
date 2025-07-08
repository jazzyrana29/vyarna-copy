import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsInt, IsOptional, IsDate } from "class-validator";

export class ProductVariantDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  variantId: string;

  @ApiProperty({ description: "Parent product id", format: "uuid" })
  @IsUUID()
  productId: string;

  @ApiProperty({ description: "SKU code" })
  @IsString()
  sku: string;

  @ApiProperty({ description: "Price in cents" })
  @IsInt()
  priceCents: number;

  @ApiProperty({ description: "Currency code" })
  @IsString()
  currency: string;

  @ApiProperty({ description: "Inventory source", required: false })
  @IsOptional()
  @IsString()
  inventorySource?: string;

  @ApiProperty({ description: "Creation timestamp", required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: "Last update timestamp", required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
