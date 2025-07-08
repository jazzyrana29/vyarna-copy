import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsInt, IsOptional, IsDate } from "class-validator";

export class ProductImageDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  imageId: string;

  @ApiProperty({ description: "Product identifier", format: "uuid" })
  @IsUUID()
  productId: string;

  @ApiProperty({ description: "Image URL" })
  @IsString()
  url: string;

  @ApiProperty({ description: "Alternative text", required: false })
  @IsOptional()
  @IsString()
  altText?: string;

  @ApiProperty({ description: "Sort order" })
  @IsInt()
  sortOrder: number;

  @ApiProperty({ description: "Creation timestamp", required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
