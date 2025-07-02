import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class MechanismPermitIdDto {
  @ApiProperty({
    description: "Unique identifier for the mechanism permit",
    type: String,
    required: true,
  })
  @IsUUID()
  mechanismPermitId: string;
}
