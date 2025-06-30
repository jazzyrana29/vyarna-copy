import { PickType } from "@nestjs/swagger";
import { FilterDto } from "./filter.dto";

export class DeleteFilterDto extends PickType(FilterDto, [
  "filterId",
  "updatedBy",
]) {}
