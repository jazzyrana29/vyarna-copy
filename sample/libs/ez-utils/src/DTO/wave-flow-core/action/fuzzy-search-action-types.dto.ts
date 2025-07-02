import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../shared-dtos/pagination.dto";
import { IsOptional, IsString } from "class-validator";

export class FuzzySearchActionTypesDto {
  @ApiPropertyOptional({
    description: "Exact match for Action Type (optional)",
    example: "AddNote",
  })
  @IsOptional()
  @IsString()
  actionType?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for Action Type (optional)",
    example: "Note",
  })
  @IsOptional()
  @IsString()
  fuzzyActionType?: string;

  @ApiPropertyOptional({
    description:
      "If present, defines pagination parameters. If omitted or null, no pagination is applied.",
    type: PaginationDto,
    nullable: true,
  })
  @IsOptional()
  @Type(() => PaginationDto)
  pagination?: PaginationDto | null;

  @ApiPropertyOptional({
    description: "Array of sorting instructions.",
    type: [SortOptionDto],
    default: [],
  })
  @IsOptional()
  @Type(() => SortOptionDto)
  sort?: SortOptionDto[] = [];
}
