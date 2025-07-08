import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsOptional, IsDate } from "class-validator";

export class CartDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  cartId: string;

  @ApiProperty({ description: "Person identifier", format: "uuid" })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: "Cart status", enum: ["ACTIVE", "CHECKED_OUT"] })
  @IsString()
  status: "ACTIVE" | "CHECKED_OUT";

  @ApiProperty({ description: "Affiliate code", required: false })
  @IsOptional()
  @IsString()
  affiliateCode?: string;

  @ApiProperty({ description: "Creation timestamp", required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: "Last update timestamp", required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
