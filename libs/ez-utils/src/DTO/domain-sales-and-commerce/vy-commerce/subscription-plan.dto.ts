import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsInt, IsDate, IsOptional } from "class-validator";

export class SubscriptionPlanDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  planId: string;

  @ApiProperty({ description: "Plan name" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Description", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: "Price in cents" })
  @IsInt()
  priceCents: number;

  @ApiProperty({ description: "Currency code" })
  @IsString()
  currency: string;

  @ApiProperty({
    description: "Billing interval",
    enum: ["WEEKLY", "MONTHLY", "QUARTERLY", "YEARLY"],
  })
  @IsString()
  interval: "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY";

  @ApiProperty({ description: "Interval count" })
  @IsInt()
  intervalCount: number;

  @ApiProperty({ description: "Trial period days", required: false })
  @IsOptional()
  @IsInt()
  trialPeriodDays?: number;

  @ApiProperty({ description: "Creation timestamp", required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: "Last update timestamp", required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
