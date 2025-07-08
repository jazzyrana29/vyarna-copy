import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsDate } from "class-validator";

export class PromotionRedemptionDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  redemptionId: string;

  @ApiProperty({ description: "Promotion identifier", format: "uuid" })
  @IsUUID()
  promoId: string;

  @ApiProperty({ description: "Cart identifier", format: "uuid" })
  @IsUUID()
  cartId: string;

  @ApiProperty({ description: "Person identifier", format: "uuid" })
  @IsUUID()
  personId: string;

  @ApiProperty({
    description: "Redemption time",
    type: String,
    format: "date-time",
  })
  @IsDate()
  redeemedAt: Date;
}
