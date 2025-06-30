import { PickType } from "@nestjs/swagger";
import { FilterSubsetDto } from "./filter-subset.dto";

export class DeleteFilterSubsetDto extends PickType(FilterSubsetDto, [
  "filterSubsetId",
  "updatedBy",
]) {}
