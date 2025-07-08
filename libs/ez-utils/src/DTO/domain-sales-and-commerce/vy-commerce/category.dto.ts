import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsOptional, IsDate } from "class-validator";

export class CategoryDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ description: "Category name" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Slug", required: true })
  @IsString()
  slug: string;

  @ApiProperty({
    description: "Parent category id",
    required: false,
    format: "uuid",
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiProperty({ description: "Creation timestamp", required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: "Last update timestamp", required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
