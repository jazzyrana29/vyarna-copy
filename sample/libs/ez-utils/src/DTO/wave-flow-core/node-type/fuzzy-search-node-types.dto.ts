import { ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { NodeTypeDto } from "./node-type.dto";
import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../shared-dtos/pagination.dto";

export class FuzzySearchNodeTypesDto extends PartialType(
  PickType(NodeTypeDto, [
    "name",
    "description",
    "updatedBy",
    "isDeleted",
  ] as const),
) {
  @ApiPropertyOptional({
    description: "Fuzzy match for Node Type name (optional)",
  })
  @IsOptional()
  @IsString()
  fuzzyName?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for Node Type description (optional)",
  })
  @IsOptional()
  @IsString()
  fuzzyDescription?: string;

  @ApiPropertyOptional({
    description:
      "Fuzzy match for the user who updated the Node Type (optional)",
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
