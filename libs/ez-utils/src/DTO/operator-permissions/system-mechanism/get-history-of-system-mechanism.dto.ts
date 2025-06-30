import { ApiProperty, PickType, PartialType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { SystemMechanismDto } from "./system-mechanism.dto";

export class GetHistoryOfSystemMechanismDto extends PartialType(
  PickType(SystemMechanismDto, ["name", "isDeleted"] as const)
) {
  @ApiProperty({
    description:
      "The unique identifier for the system mechanism history record",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  systemMechanismId: string;
}
