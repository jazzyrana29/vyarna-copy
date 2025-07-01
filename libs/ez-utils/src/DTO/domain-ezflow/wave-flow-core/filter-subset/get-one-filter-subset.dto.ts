import { PartialType, PickType } from "@nestjs/swagger";
import { FilterSubsetDto } from "./filter-subset.dto";

export class GetOneFilterSubsetDto extends PartialType(
  PickType(FilterSubsetDto, ["filterSubsetId", "isDeleted"]),
) {}
