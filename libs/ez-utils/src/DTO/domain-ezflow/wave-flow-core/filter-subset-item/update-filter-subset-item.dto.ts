import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { FilterSubsetItemDto } from "./filter-subset-item.dto";
import { IsUUID } from "class-validator";

export class UpdateFilterSubsetItemDto extends PartialType(
  PickType(FilterSubsetItemDto, [
    "evaluationVariableId",
    "evaluationOperatorId",
    "evaluationValue",
    "filterSubsetId",
    "updatedBy",
  ]),
) {
  @ApiProperty({
    description: "Unique identifier of the filter subset item",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  filterSubsetItemId: string;
}
