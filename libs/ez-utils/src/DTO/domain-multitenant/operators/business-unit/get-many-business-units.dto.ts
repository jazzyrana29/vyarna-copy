import { ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { BusinessUnitDto } from "./business-unit.dto";
import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../shared-dtos/pagination.dto";

export class GetManyBusinessUnitsDto extends PartialType(
  PickType(BusinessUnitDto, [
    "parentBusinessUnitId",
    "name",
    "isDeleted",
    "updatedBy",
  ] as const),
) {
  @ApiPropertyOptional({
    description:
      "If present, defines pagination parameters. If omitted or null, no pagination is applied.",
    type: PaginationDto,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto | null;

  @ApiPropertyOptional({
    description: "Array of sorting instructions.",
    type: [SortOptionDto],
    default: [],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SortOptionDto)
  sort?: SortOptionDto[] = [];
}
