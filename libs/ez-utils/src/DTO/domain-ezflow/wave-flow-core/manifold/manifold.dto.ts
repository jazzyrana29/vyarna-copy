import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { FilterDto } from "../filter/filter.dto";
import { NodeDto } from "../node/node.dto";
import { Type } from "class-transformer";

export class ManifoldDto {
  @ApiProperty({
    description: "Unique identifier of the manifold",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  manifoldId: string;

  @ApiProperty({
    description: "Name of the manifold",
    example: "Product Filtering Manifold",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the manifold",
    example:
      "This manifold is used for filtering products based on certain conditions.",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Execution style of the manifold ("RUN All" or "STOP ON HIT")',
    example: "RUN All",
  })
  @IsString()
  executionStyle: string;

  @ApiProperty({
    description: "Filters associated with this manifold",
    type: [FilterDto],
  })
  @IsArray()
  filters: FilterDto[];

  @ApiProperty({
    description: "Node associated with this manifold",
    type: NodeDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => NodeDto)
  node?: NodeDto;

  @ApiProperty({
    description: "Unique identifier of the associated node",
    example: "123e4567-e89b-12d3-a456-426614174000",
    required: false,
  })
  @IsUUID()
  nodeId?: string;

  @ApiProperty({
    description: "Indicates whether the manifold is deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "ID of the user who last updated the manifold",
    example: "user-uuid",
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "Date when the manifold was created",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Date when the manifold was last updated",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  updatedAt: Date;
}
