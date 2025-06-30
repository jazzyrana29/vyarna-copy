import { PickType } from "@nestjs/swagger";
import { BusinessUnitDto } from "./business-unit.dto";

export class CreateBusinessUnitDto extends PickType(BusinessUnitDto, [
  "name",
  "parentBusinessUnitId",
  "children",
  "updatedBy",
] as const) {}
