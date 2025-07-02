import { PartialType, PickType } from "@nestjs/swagger";
import { FilterDto } from "./filter.dto";

export class GetOneFilterDto extends PartialType(
  PickType(FilterDto, ["filterId", "filterName", "isDeleted"]),
) {}
