import { PickType } from "@nestjs/swagger";
import { FilterSubsetDto } from "./filter-subset.dto";

export class CreateFilterSubsetDto extends PickType(FilterSubsetDto, [
  "filterId",
  "filterSubsetInternalLogicalBinding",
  "nextFilterSubsetLogicalBinding",
  "updatedBy",
]) {}
