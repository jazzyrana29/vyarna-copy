import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { NodeDto } from "../node/node.dto";

export class NodeTypeDto {
  @ApiProperty({
    description: "Unique identifier of the node type",
    example: "456e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  nodeTypeId: string;

  @ApiProperty({
    description: "Name of the node type",
    example: "Processing Type",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the node type",
    example: "This node type is used for processing",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Nodes associated with this node type",
    type: [NodeDto],
  })
  @IsArray()
  nodes: NodeDto[];

  @ApiProperty({
    description: "Indicates whether the node type is deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "ID of the user who last updated the node type",
    example: "user-uuid",
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "Date when the node type was created",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Date when the node type was last updated",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  updatedAt: Date;
}
