import { ApiProperty, PickType, PartialType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { MechanismPermitDto } from "./mechanism-permit.dto";

export class GetHistoryOfMechanismPermitDto extends PartialType(
  PickType(MechanismPermitDto, ["name", "isDeleted"] as const),
) {
  @ApiProperty({
    description:
      "The unique identifier for the mechanism permit history record",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  mechanismPermitId: string;
}
