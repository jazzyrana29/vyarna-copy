import { PickType, PartialType, ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { BusinessUnitDto } from "./business-unit.dto";

export class UpdateBusinessUnitDto extends PartialType(
  PickType(BusinessUnitDto, [
    "name",
    "parentBusinessUnitId",
    "children",
    "isDeleted",
    "updatedBy",
  ] as const)
) {
  @ApiProperty({
    description: "Unique identifier for the business unit",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  businessUnitId: string;
}
