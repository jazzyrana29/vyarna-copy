import { ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { EvaluationOperatorDto } from "./evaluation-operator.dto";
import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../shared-dtos/pagination.dto";

export class FuzzySearchEvaluationOperatorsDto extends PartialType(
  PickType(EvaluationOperatorDto, [
    "name",
    "symbol",
    "description",
    "choiceType",
    "isDeleted",
    "updatedBy",
  ] as const),
) {
  @ApiPropertyOptional({
    description: "Fuzzy match for operator name (optional)",
  })
  @IsOptional()
  @IsString()
  fuzzyName?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for operator symbol (optional)",
  })
  @IsOptional()
  @IsString()
  fuzzySymbol?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for operator description (optional)",
  })
  @IsOptional()
  @IsString()
  fuzzyDescription?: string;

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
  @ValidateNested({ each: true })
  @Type(() => SortOptionDto)
  @IsOptional()
  sort?: SortOptionDto[] = [];

  @ApiPropertyOptional({
    description: "Filter by a specific EvaluationVariableDataType ID",
    example: "ed3c7063-b0f9-42a0-a044-5924bff894c5",
  })
  @IsOptional()
  @IsUUID()
  evaluationVariableDataTypeId?: string;
}
