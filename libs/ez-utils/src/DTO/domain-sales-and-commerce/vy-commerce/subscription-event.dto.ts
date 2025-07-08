import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsDate, IsOptional } from "class-validator";

export class SubscriptionEventDto {
  @ApiProperty({ description: "Unique identifier", format: "uuid" })
  @IsUUID()
  eventId: string;

  @ApiProperty({ description: "Subscription id", format: "uuid" })
  @IsUUID()
  subscriptionId: string;

  @ApiProperty({
    description: "Event type",
    enum: ["RENEWAL", "PAYMENT_FAILED", "CANCELLATION"],
  })
  @IsString()
  eventType: "RENEWAL" | "PAYMENT_FAILED" | "CANCELLATION";

  @ApiProperty({ description: "Event time", type: String, format: "date-time" })
  @IsDate()
  eventTime: Date;

  @ApiProperty({ description: "Payload data" })
  payload: Record<string, unknown>;

  @ApiProperty({ description: "Creation timestamp", required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: "Last update timestamp", required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
