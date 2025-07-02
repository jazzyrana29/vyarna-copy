import { PickType, PartialType, ApiPropertyOptional } from "@nestjs/swagger";
import { NodeExitTypeDto } from "./node-exit-type.dto";
import { IsOptional, ValidateNested } from "class-validator";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { Type } from "class-transformer";

export class GetManyNodeExitTypesDto extends PartialType(
  PickType(NodeExitTypeDto, [
    "name",
    "description",
    "updatedBy",
    "isDeleted",
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
    description:
      'Array of sorting instructions. Example: [{ by: "createdAt", order: "ASC" }]',
    type: [SortOptionDto],
    default: [],
  })
  @ValidateNested({ each: true })
  @Type(() => SortOptionDto)
  @IsOptional()
  sort?: SortOptionDto[] = [];
}
