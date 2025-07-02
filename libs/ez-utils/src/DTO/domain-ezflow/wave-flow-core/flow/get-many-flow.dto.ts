import { PickType, PartialType, ApiPropertyOptional } from "@nestjs/swagger";
import { FlowDto } from "./flow.dto";
import { IsOptional, ValidateNested } from "class-validator";
import { PaginationDto } from "../../shared-dtos/pagination.dto";
import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { Type } from "class-transformer";

export class GetManyFlowsDto extends PartialType(
  PickType(FlowDto, [
    "name",
    "description",
    "updatedBy",
    "isDeleted",
    "isPublished",
    "waveTypeId",
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
