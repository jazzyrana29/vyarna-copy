import { PickType } from "@nestjs/swagger";
import { FilterSubsetItemDto } from "./filter-subset-item.dto";

export class GetZtrackingFilterSubsetItemDto extends PickType(
  FilterSubsetItemDto,
  ["filterSubsetItemId"],
) {}
