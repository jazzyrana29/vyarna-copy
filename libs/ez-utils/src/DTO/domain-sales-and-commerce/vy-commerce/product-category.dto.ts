import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsDate, IsOptional } from "class-validator";

export class ProductCategoryDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Product identifier", format: "uuid" })
  @IsUUID()
  productId: string;

  @ApiProperty({ description: "Category identifier", format: "uuid" })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ description: "Creation timestamp", required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
