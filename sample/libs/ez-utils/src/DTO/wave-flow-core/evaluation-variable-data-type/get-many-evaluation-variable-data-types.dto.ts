import { ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { IsOptional, ValidateNested, IsUUID } from "class-validator";
import { Type } from "class-transformer";
import { EvaluationVariableDataTypeDto } from "./evaluation-variable-data-type.dto";
import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../shared-dtos/pagination.dto";

export class GetManyEvaluationVariableDataTypesDto extends PartialType(
  PickType(EvaluationVariableDataTypeDto, [
    "name",
    "description",
    "isDeleted",
    "updatedBy",
  ] as const),
) {
  @ApiPropertyOptional({
    description: "Defines pagination parameters (optional).",
    type: PaginationDto,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto | null;

  @ApiPropertyOptional({
    description: "Array of sorting instructions (optional).",
    type: [SortOptionDto],
    default: [],
  })
  @ValidateNested({ each: true })
  @Type(() => SortOptionDto)
  @IsOptional()
  sort?: SortOptionDto[] = [];
}
