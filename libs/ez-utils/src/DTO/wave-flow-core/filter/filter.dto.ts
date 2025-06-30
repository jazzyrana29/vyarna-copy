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
import { ManifoldDto } from "../manifold/manifold.dto";
import { FilterSubsetDto } from "../filter-subset/filter-subset.dto";
import { NodeExitDto } from "../node-exit/node-exit.dto";
import { Type } from "class-transformer";

export class FilterDto {
  @ApiProperty({
    description: "Unique identifier of the filter",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  filterId: string;

  @ApiProperty({ description: "Name of the filter", example: "Price Filter" })
  @IsString()
  filterName: string;

  @ApiProperty({
    description: "Description of the filter",
    example: "Filters products by price range",
  })
  @IsString()
  filterDescription: string;

  @ApiProperty({
    description: "Indicates whether the filter is active",
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description:
      "Order in which the filter is shown and executed within the manifold",
    example: 1,
  })
  @IsInt()
  manifoldOrder: number;

  @ApiProperty({
    description: "Manifold object associated with this filter",
    type: () => ManifoldDto,
  })
  @Type(() => ManifoldDto)
  manifold: ManifoldDto;

  @ApiProperty({
    description: "Unique identifier of the associated manifold",
    example: "manifold-uuid",
  })
  @IsUUID()
  manifoldId: string;

  @ApiProperty({
    description: "Filter subsets associated with this filter",
    type: [FilterSubsetDto],
  })
  @IsArray()
  filterSubsets: FilterSubsetDto[];

  @ApiProperty({
    description: "NodeExit object associated with this filter",
    type: () => NodeExitDto,
  })
  @Type(() => NodeExitDto)
  nodeExit: NodeExitDto;

  @ApiProperty({
    description: "Unique identifier of the associated nodeExit",
    example: "nodeExit-uuid",
  })
  @IsUUID()
  nodeExitId: string;

  @ApiProperty({
    description: "Indicates whether the filter is deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "ID of the user who last updated the filter",
    example: "user-uuid",
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "Date when the filter was created",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Date when the filter was last updated",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  updatedAt: Date;
}
