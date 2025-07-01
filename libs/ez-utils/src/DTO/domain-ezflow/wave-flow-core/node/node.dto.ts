import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { FlowDto } from "../flow/flow.dto";
import { NodeExitDto } from "../node-exit/node-exit.dto";
import { NodeTypeDto } from "../node-type/node-type.dto";
import { Type } from "class-transformer";
import { ManifoldDto } from "../manifold/manifold.dto";
import { ActionDto } from "../action/action.dto";
import { TaskDto } from "../task/task.dto";

export class NodeDto extends IntersectionType(
  PickType(FlowDto, ["flowId"] as const),
  PickType(NodeTypeDto, ["nodeTypeId"] as const)
) {
  @ApiProperty({
    description: "The unique identifier of the node",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  nodeId: string;

  @ApiProperty({
    description: "The name of the node",
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "The X coordinate of the node position",
    type: Number,
  })
  @IsNumber()
  positionX: number;

  @ApiProperty({
    description: "The Y coordinate of the node position",
    type: Number,
  })
  @IsNumber()
  positionY: number;

  @ApiProperty({
    description: "The flow associated with this node",
    type: () => FlowDto,
  })
  @Type(() => FlowDto)
  flow: FlowDto;

  @ApiProperty({
    description: "The node type associated with this node",
    type: () => NodeTypeDto,
  })
  @Type(() => NodeTypeDto)
  nodeType: NodeTypeDto;

  @ApiProperty({
    description: "The manifold associated with this node",
    type: () => ManifoldDto,
    required: false,
  })
  @IsOptional()
  @Type(() => ManifoldDto)
  manifold?: ManifoldDto;

  @ApiProperty({
    description: "The unique identifier of the associated manifold",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  manifoldId?: string;

  @ApiProperty({
    description: "The action associated with this node",
    type: () => ActionDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ActionDto)
  action?: ActionDto;

  @ApiProperty({
    description: "The unique identifier of the associated action",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  actionId?: string;

  @ApiProperty({
    description: "List of node exits associated with the node",
    type: [NodeExitDto],
    default: [],
  })
  nodeExits: NodeExitDto[];

  @ApiProperty({
    description: "List of node exits (inputs) that enter into this node",
    type: [NodeExitDto],
    default: [],
  })
  @Type(() => NodeExitDto)
  incomingExits: NodeExitDto[];

  @ApiProperty({
    description: "List of tasks associated with this node",
    type: [TaskDto],
    default: [],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskDto)
  tasks: TaskDto[];

  @ApiProperty({
    description: "Indicates if the node is marked as deleted",
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "The user who last updated this node",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "The date when the node was created",
    type: Date,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "The date when the node was last updated",
    type: Date,
  })
  @IsDate()
  updatedAt: Date;
}
