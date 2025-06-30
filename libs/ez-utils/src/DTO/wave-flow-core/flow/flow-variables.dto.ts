import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";

/**
 * Describes the data type of an evaluation variable (e.g., Numeric, Text, etc.).
 */
class FlowVariablesEvaluationVariableDataTypeDto {
  @ApiProperty({
    description: "UUID of the evaluation variable data type",
    example: "a111f91c-deaf-4a8d-a3f7-c8151f25e1b1",
  })
  @IsUUID()
  evaluationVariableDataTypeId: string;

  @ApiProperty({
    description: "Name of the data type (e.g., Numeric, Text, Coordinates)",
    example: "Numeric",
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: "A brief description of this data type",
    example: "Any numerical value.",
  })
  @IsOptional()
  @IsString()
  description?: string;
}

/**
 * Represents an evaluation variable on a filterSubsetItem,
 * including its data type info.
 */
class FlowVariablesEvaluationVariableDto {
  @ApiProperty({
    description: "UUID of the evaluation variable",
    example: "e1c2922f-1234-4c6f-a77b-6e2fbbae0555",
  })
  @IsUUID()
  evaluationVariableId: string;

  @ApiProperty({
    description: "Name of the evaluation variable",
    example: "temperature",
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: "A short description about the variable",
    example: "The ambient temperature in Celsius",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "Data type information for this evaluation variable",
    type: FlowVariablesEvaluationVariableDataTypeDto,
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => FlowVariablesEvaluationVariableDataTypeDto)
  evaluationVariableDataType?: FlowVariablesEvaluationVariableDataTypeDto;
}

/**
 * Represents an evaluation operator on a filterSubsetItem.
 */
class FlowVariablesEvaluationOperatorDto {
  @ApiProperty({
    description: "UUID of the evaluation operator",
    example: "b980f91c-deaf-4a8d-1234-c8151f25e1b1",
  })
  @IsUUID()
  evaluationOperatorId: string;

  @ApiProperty({ description: "Name of the operator", example: "Greater Than" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Symbol used by the operator", example: ">" })
  @IsString()
  symbol: string;

  @ApiPropertyOptional({
    description: "Operator description",
    example: "Checks if the left side is greater than the right side",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "Specifies how choices are handled, e.g. numeric/text",
    example: "numeric",
  })
  @IsOptional()
  @IsString()
  choiceType?: string;
}

/**
 * FilterSubsetItem: holds references to an evaluation variable + operator.
 */
class FlowVariablesFilterSubsetItemDto {
  @ApiProperty({
    description: "UUID of the filter subset item",
    example: "3d280628-1f23-4bc8-b2a9-607ea5272f9d",
  })
  @IsUUID()
  filterSubsetItemId: string;

  @ApiPropertyOptional({
    description: "The evaluation variable used",
    type: FlowVariablesEvaluationVariableDto,
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => FlowVariablesEvaluationVariableDto)
  evaluationVariable?: FlowVariablesEvaluationVariableDto;

  @ApiPropertyOptional({
    description: "The evaluation operator used",
    type: FlowVariablesEvaluationOperatorDto,
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => FlowVariablesEvaluationOperatorDto)
  evaluationOperator?: FlowVariablesEvaluationOperatorDto;
}

/**
 * FilterSubset: grouping of items, e.g. with an AND/OR logical binding.
 */
class FlowVariablesFilterSubsetDto {
  @ApiProperty({
    description: "UUID of the filter subset",
    example: "9f07b4e3-6182-49c4-8599-944b95132738",
  })
  @IsUUID()
  filterSubsetId: string;

  @ApiPropertyOptional({
    description: "List of filter subset items",
    type: [FlowVariablesFilterSubsetItemDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlowVariablesFilterSubsetItemDto)
  filterSubsetItems?: FlowVariablesFilterSubsetItemDto[];
}

/**
 * Filter: holds one or more filter subsets, each with its own items.
 */
class FlowVariablesFilterDto {
  @ApiProperty({
    description: "UUID of the filter",
    example: "4fe7f91c-deaf-4a8d-a3f7-c8151f25e1b1",
  })
  @IsUUID()
  filterId: string;

  @ApiPropertyOptional({
    description: "List of filter subsets in this filter",
    type: [FlowVariablesFilterSubsetDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlowVariablesFilterSubsetDto)
  filterSubsets?: FlowVariablesFilterSubsetDto[];
}

/**
 * Manifold: holds multiple filters for "AND" or "OR" logic, etc.
 */
class FlowVariablesManifoldDto {
  @ApiProperty({
    description: "UUID of the manifold",
    example: "5fe7f91c-deaf-4a8d-a3f7-c8151f25e1b1",
  })
  @IsUUID()
  manifoldId: string;

  @ApiPropertyOptional({
    description: "List of filters for this manifold",
    type: [FlowVariablesFilterDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlowVariablesFilterDto)
  filters?: FlowVariablesFilterDto[];
}

/**
 * Node: can optionally reference a manifold.
 */
class FlowVariablesNodeDto {
  @ApiProperty({
    description: "UUID of the node",
    example: "d7ef811c-deaf-1234-a3f7-c8151f25e1b1",
  })
  @IsUUID()
  nodeId: string;

  @ApiPropertyOptional({
    description: "Manifold associated with this node",
    type: FlowVariablesManifoldDto,
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => FlowVariablesManifoldDto)
  manifold?: FlowVariablesManifoldDto;
}

/**
 * Top-level object that stores the flow variables hierarchy:
 * flowId -> nodes[] -> manifold -> filters -> filterSubsets -> filterSubsetItems
 */
export class FlowVariablesDto {
  @ApiProperty({
    description: "UUID of the flow",
    example: "715e291c-deaf-4a8d-a3f7-c8151f25e1b1",
  })
  @IsUUID()
  flowId: string;

  @ApiPropertyOptional({
    description: "List of nodes included in this flow variable snapshot",
    type: [FlowVariablesNodeDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlowVariablesNodeDto)
  nodes?: FlowVariablesNodeDto[];
}
