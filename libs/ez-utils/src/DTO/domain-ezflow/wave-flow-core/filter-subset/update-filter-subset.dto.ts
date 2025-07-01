import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { FilterSubsetDto } from "./filter-subset.dto";
import { IsUUID } from "class-validator";

export class UpdateFilterSubsetDto extends PartialType(
  PickType(FilterSubsetDto, [
    "filterId",
    "filterOrder",
    "filterSubsetInternalLogicalBinding",
    "nextFilterSubsetLogicalBinding",
    "updatedBy",
  ]),
) {
  @ApiProperty({
    description: "Unique identifier of the filter subset",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  filterSubsetId: string;
}
