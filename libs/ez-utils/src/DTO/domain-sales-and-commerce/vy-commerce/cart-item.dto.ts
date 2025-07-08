import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsInt, IsDate, IsOptional } from "class-validator";

export class CartItemDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  itemId: string;

  @ApiProperty({ description: "Cart identifier", format: "uuid" })
  @IsUUID()
  cartId: string;

  @ApiProperty({ description: "Variant identifier", format: "uuid" })
  @IsUUID()
  variantId: string;

  @ApiProperty({ description: "Quantity" })
  @IsInt()
  quantity: number;

  @ApiProperty({ description: "Unit price in cents" })
  @IsInt()
  unitPriceCents: number;

  @ApiProperty({ description: "Creation timestamp", required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: "Last update timestamp", required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
