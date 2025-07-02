import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class ZtrackingNodeDto {
  @ApiProperty({
    description: "The unique identifier for the Ztracking node version",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "The identifier for the node",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  nodeId: string;

  @ApiProperty({
    description: "The name of the Ztracking node",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "The X position of the Ztracking node",
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  positionX?: number;

  @ApiProperty({
    description: "The Y position of the Ztracking node",
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  positionY?: number;

  @ApiProperty({
    description: "The flow ID associated with this Ztracking node",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  flowId?: string;

  @ApiProperty({
    description: "The node type ID associated with this Ztracking node",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  nodeTypeId?: string;

  @ApiProperty({
    description: "Indicates if the Ztracking node is marked as deleted",
    type: Boolean,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    description: "The user who last updated this Ztracking node",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "The date when the Ztracking node version was created",
    type: Date,
  })
  @IsDate()
  versionDate: Date;
}
