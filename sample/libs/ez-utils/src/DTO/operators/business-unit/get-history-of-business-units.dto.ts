import { PickType } from "@nestjs/swagger";
import { BusinessUnitDto } from "./business-unit.dto";

export class GetHistoryOfBusinessUnitsDto extends PickType(BusinessUnitDto, [
  "businessUnitId",
] as const) {}
