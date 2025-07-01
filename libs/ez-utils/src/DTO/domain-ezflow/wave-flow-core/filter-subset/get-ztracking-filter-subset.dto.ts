import { PickType } from "@nestjs/swagger";
import { FilterSubsetDto } from "./filter-subset.dto";

export class GetZtrackingFilterSubsetDto extends PickType(FilterSubsetDto, [
  "filterSubsetId",
]) {}
