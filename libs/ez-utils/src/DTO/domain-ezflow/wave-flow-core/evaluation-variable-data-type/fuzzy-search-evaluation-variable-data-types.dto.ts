import { ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { EvaluationVariableDataTypeDto } from "./evaluation-variable-data-type.dto";
import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../shared-dtos/pagination.dto";

export class FuzzySearchEvaluationVariableDataTypesDto extends PartialType(
  PickType(EvaluationVariableDataTypeDto, [
    "name",
    "description",
    "isDeleted",
    "updatedBy",
  ] as const),
) {
  @ApiPropertyOptional({
    description: "Fuzzy match for the data type's name (optional).",
  })
  @IsOptional()
  @IsString()
  fuzzyName?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for the data type's description (optional).",
  })
  @IsOptional()
  @IsString()
  fuzzyDescription?: string;

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
