import { ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { FlowDto } from "./flow.dto";
import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../shared-dtos/pagination.dto";
import { Type } from "class-transformer";

export class FuzzySearchFlowsDto extends PartialType(
  PickType(FlowDto, [
    "name",
    "description",
    "updatedBy",
    "isDeleted",
    "isPublished",
    "waveTypeId",
  ] as const)
) {
  @ApiPropertyOptional({
    description: "Fuzzy match for Flow name (optional)",
  })
  @IsOptional()
  @IsString()
  fuzzyName?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for Flow description (optional)",
  })
  @IsOptional()
  @IsString()
  fuzzyDescription?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for the user who updated Flow (optional)",
  })
  @IsOptional()
  @IsString()
  fuzzyUpdatedBy?: string;

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
