import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsUUID,
} from "class-validator";
import { NodeDto } from "../node/node.dto";
import { NodeExitTypeDto } from "../node-exit-type/node-exit-type.dto";
import { FilterDto } from "../filter/filter.dto";
import { Type } from "class-transformer";
import { TaskDto } from "../task/task.dto";

export class NodeExitDto extends IntersectionType(
  PickType(NodeExitTypeDto, ["nodeExitTypeId"] as const),
) {
  @ApiProperty({
    description: "The unique identifier of the node exit",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  nodeExitId: string;

  @ApiProperty({
    description: "The source node ID from which this exit originates",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  sourceNodeId: string;

  @ApiProperty({
    description: "The source node object",
    type: () => NodeDto,
    required: false,
  })
  @IsOptional()
  @Type(() => NodeDto)
  sourceNode?: NodeDto;

  @ApiProperty({
    description: "The target node ID to which this exit leads (if any)",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  targetNodeId?: string;

  @ApiProperty({
    description: "The target node object",
    type: () => NodeDto,
    required: false,
  })
  @IsOptional()
  @Type(() => NodeDto)
  targetNode?: NodeDto;

  @ApiProperty({
    description: "The node exit type associated with this exit",
    type: () => NodeExitTypeDto,
  })
  @Type(() => NodeExitTypeDto)
  nodeExitType: NodeExitTypeDto;

  @ApiProperty({
    description: "List of tasks executed from this exit",
    required: false,
    isArray: true,
    example: [],
  })
  @IsOptional()
  @IsArray()
  @Type(() => TaskDto)
  executedTasks?: TaskDto[];

  @ApiProperty({
    description: "The filter ID associated with this exit",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  filterId?: string;

  @ApiProperty({
    description: "The filter associated with this exit",
    type: () => FilterDto,
    required: false,
  })
  @Type(() => FilterDto)
  filter: FilterDto;

  @ApiProperty({
    description: "Indicates if the node exit is marked as deleted",
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "The user who last updated this node exit",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "The date when the node exit was created",
    type: Date,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "The date when the node exit was last updated",
    type: Date,
  })
  @IsDate()
  updatedAt: Date;
}
