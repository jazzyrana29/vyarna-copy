import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsInt, IsDate, IsOptional } from "class-validator";

export class PromotionCodeDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  promoId: string;

  @ApiProperty({ description: "Promotion code" })
  @IsString()
  code: string;

  @ApiProperty({ description: "Discount type", enum: ["PERCENTAGE", "AMOUNT"] })
  @IsString()
  discountType: "PERCENTAGE" | "AMOUNT";

  @ApiProperty({ description: "Value of discount" })
  @IsInt()
  value: number;

  @ApiProperty({ description: "Valid from", type: String, format: "date-time" })
  @IsDate()
  validFrom: Date;

  @ApiProperty({ description: "Valid to", type: String, format: "date-time" })
  @IsDate()
  validTo: Date;

  @ApiProperty({ description: "Maximum redemptions" })
  @IsInt()
  maxRedemptions: number;

  @ApiProperty({ description: "Creation timestamp", required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: "Last update timestamp", required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
