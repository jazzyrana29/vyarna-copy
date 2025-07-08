import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsDate, IsOptional } from "class-validator";

export class SubscriptionDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  subscriptionId: string;

  @ApiProperty({ description: "Person identifier", format: "uuid" })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: "Plan identifier", format: "uuid" })
  @IsUUID()
  planId: string;

  @ApiProperty({
    description: "Status",
    enum: ["PENDING", "ACTIVE", "PAUSED", "CANCELLED"],
  })
  @IsString()
  status: "PENDING" | "ACTIVE" | "PAUSED" | "CANCELLED";

  @ApiProperty({ description: "Start date", type: String, format: "date-time" })
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: "Next billing date",
    type: String,
    format: "date-time",
  })
  @IsDate()
  nextBillingDate: Date;

  @ApiProperty({
    description: "Cancellation timestamp",
    required: false,
    type: String,
    format: "date-time",
  })
  @IsOptional()
  @IsDate()
  canceledAt?: Date;

  @ApiProperty({ description: "Creation timestamp", required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: "Last update timestamp", required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
