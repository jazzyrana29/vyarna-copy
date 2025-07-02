import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { FilterSubsetItemDto } from "../filter-subset-item/filter-subset-item.dto";
import { FilterDto } from "../filter/filter.dto";
import { Type } from "class-transformer";

export class FilterSubsetDto {
  @ApiProperty({
    description: "Unique identifier of the filter subset",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  filterSubsetId: string;

  @ApiProperty({
    description: "Unique identifier of the filter",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  filterId: string;

  @ApiProperty({
    description:
      "Order in which the filter subset is shown and executed within the filter",
    example: 1,
  })
  @IsInt()
  filterOrder: number;

  @ApiProperty({
    description: 'Logical binding for filter subset items ("AND" or "OR")',
    example: "AND",
  })
  @IsString()
  filterSubsetInternalLogicalBinding: string;

  @ApiProperty({
    description:
      'Logical binding between this filter subset and the next subset ("AND" or "OR")',
    example: "OR",
  })
  @IsOptional()
  @IsString()
  nextFilterSubsetLogicalBinding?: string;

  @ApiProperty({
    description: "Filter associated with the filter subset",
    type: () => FilterDto,
  })
  @Type(() => FilterDto)
  filter: FilterDto;

  @ApiProperty({
    description: "Filter subset items associated with the filter subset",
    type: [FilterSubsetItemDto],
  })
  @IsArray()
  filterSubsetItems: FilterSubsetItemDto[];

  @ApiProperty({
    description: "Indicates whether the filter subset is deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "ID of the user who last updated the filter subset",
    example: "user-uuid",
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "Date when the filter subset was created",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Date when the filter subset was last updated",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  updatedAt: Date;
}
