import { PickType } from "@nestjs/swagger";
import { FilterDto } from "./filter.dto";

export class CreateFilterDto extends PickType(FilterDto, [
  "filterName",
  "filterDescription",
  "isActive",
  "manifoldId",
  "updatedBy",
]) {}
