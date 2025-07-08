import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsOptional, IsDate } from "class-validator";

export class AffiliateClickDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  clickId: string;

  @ApiProperty({ description: "Affiliate partner id", format: "uuid" })
  @IsUUID()
  partnerId: string;

  @ApiProperty({ description: "Person id", required: false, format: "uuid" })
  @IsOptional()
  @IsUUID()
  personId?: string;

  @ApiProperty({ description: "Cart id", required: false, format: "uuid" })
  @IsOptional()
  @IsUUID()
  cartId?: string;

  @ApiProperty({ description: "URL" })
  @IsString()
  url: string;

  @ApiProperty({ description: "Referrer", required: false })
  @IsOptional()
  @IsString()
  referrer?: string;

  @ApiProperty({ description: "Click time", type: String, format: "date-time" })
  @IsDate()
  clickedAt: Date;
}
