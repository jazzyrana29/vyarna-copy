import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsDate } from "class-validator";

export class ValidateCareEventTimeDto {
  @ApiProperty({ description: "Baby identifier" })
  @IsUUID()
  babyId: string;

  @ApiProperty({
    description: "Event timestamp",
    type: String,
    format: "date-time",
  })
  @IsDate()
  eventTime: Date;
}
