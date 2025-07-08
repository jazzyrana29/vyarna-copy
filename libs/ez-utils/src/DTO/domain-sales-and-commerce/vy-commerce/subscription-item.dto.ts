import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsInt, IsDate, IsOptional } from "class-validator";

export class SubscriptionItemDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  subscriptionItemId: string;

  @ApiProperty({ description: "Subscription id", format: "uuid" })
  @IsUUID()
  subscriptionId: string;

  @ApiProperty({ description: "Variant id", format: "uuid" })
  @IsUUID()
  variantId: string;

  @ApiProperty({ description: "Quantity" })
  @IsInt()
  quantity: number;

  @ApiProperty({ description: "Creation timestamp", required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: "Last update timestamp", required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
