import { ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../shared-dtos/pagination.dto";
import { PersonDto } from "./person.dto";

export class GetManyPersonsDto extends PartialType(
  PickType(PersonDto, [
    "username",
    "nameFirst",
    "nameMiddle",
    "nameLastFirst",
    "nameLastSecond",
    "emails",
    "rootBusinessUnitId",
    "isDeleted",
    "updatedBy",
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
    description: "Array of sorting instructions.",
    type: [SortOptionDto],
    default: [],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SortOptionDto)
  sort?: SortOptionDto[] = [];
}
