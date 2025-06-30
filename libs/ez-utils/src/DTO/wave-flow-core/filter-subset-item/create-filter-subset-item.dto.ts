import { PickType } from "@nestjs/swagger";
import { FilterSubsetItemDto } from "./filter-subset-item.dto";

export class CreateFilterSubsetItemDto extends PickType(FilterSubsetItemDto, [
  "evaluationVariableId",
  "evaluationOperatorId",
  "evaluationValue",
  "filterSubsetId",
  "updatedBy",
]) {}
