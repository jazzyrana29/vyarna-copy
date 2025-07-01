import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { FilterDto } from "./filter.dto";
import { IsUUID } from "class-validator";

export class UpdateFilterDto extends PartialType(
  PickType(FilterDto, [
    "filterName",
    "filterDescription",
    "isActive",
    "manifoldId",
    "manifoldOrder",
    "updatedBy",
  ]),
) {
  @ApiProperty({
    description: "Unique identifier of the filter",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  filterId: string;
}
