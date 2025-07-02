import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class BusinessUnitIdDto {
  @ApiProperty({
    description: "Unique identifier for the business unit",
    required: true,
    example: "bu-1234",
  })
  @IsUUID()
  businessUnitId: string;
}
