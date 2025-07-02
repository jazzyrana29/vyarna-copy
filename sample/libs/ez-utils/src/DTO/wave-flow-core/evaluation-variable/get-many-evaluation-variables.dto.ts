import { ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { IsOptional, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { EvaluationVariableDto } from "./evaluation-variable.dto";
import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../shared-dtos/pagination.dto";

export class GetManyEvaluationVariablesDto extends PartialType(
  PickType(EvaluationVariableDto, [
    "name",
    "description",
    "isDeleted",
  ] as const),
) {
  @ApiPropertyOptional({
    description: "Unique identifier for the variable data type to filter on",
    example: "e3e70632-b0f9-42e0-a054-5924bff894c5",
  })
  @IsOptional()
  @IsUUID()
  evaluationVariableDataTypeId?: string;

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
}
