import { ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ManifoldDto } from "./manifold.dto";
import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../shared-dtos/pagination.dto";

export class FuzzySearchManifoldsDto extends PartialType(
  PickType(ManifoldDto, [
    "name",
    "description",
    "executionStyle",
    "nodeId",
    "updatedBy",
    "isDeleted",
  ] as const)
) {
  @ApiPropertyOptional({
    description: "Fuzzy match for the Manifold name (optional)",
  })
  @IsOptional()
  @IsString()
  fuzzyName?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for the Manifold description (optional)",
  })
  @IsOptional()
  @IsString()
  fuzzyDescription?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for the Manifold execution style (optional)",
  })
  @IsOptional()
  @IsString()
  fuzzyExecutionStyle?: string;

  @ApiPropertyOptional({
    description:
      "Fuzzy match for the user who last updated the Manifold (optional)",
  })
  @IsOptional()
  @IsString()
  fuzzyUpdatedBy?: string;

  @ApiPropertyOptional({
    description:
      "If provided, defines pagination parameters. If omitted or null, pagination is not applied.",
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
