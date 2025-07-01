import { PartialType, PickType } from "@nestjs/swagger";
import { FilterSubsetItemDto } from "./filter-subset-item.dto";

export class GetOneFilterSubsetItemDto extends PartialType(
  PickType(FilterSubsetItemDto, ["filterSubsetItemId", "isDeleted"]),
) {}
