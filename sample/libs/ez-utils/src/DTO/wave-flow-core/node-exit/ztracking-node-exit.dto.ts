import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsOptional, IsUUID } from "class-validator";

export class ZtrackingNodeExitDto {
  @ApiProperty({
    description: "The unique identifier of the Ztracking node exit version",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "The identifier for the node exit",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  nodeExitId: string;

  @ApiProperty({
    description: "The ID of the associated node exit type",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  nodeExitTypeId?: string;

  @ApiProperty({
    description: "The ID of the source node from which this exit originates",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  sourceNodeId?: string;

  @ApiProperty({
    description: "The ID of the target node to which this exit leads (if any)",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  targetNodeId?: string;

  @ApiProperty({
    description: "The ID of the associated filter",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  filterId?: string;

  @ApiProperty({
    description: "Indicates if the Ztracking node exit is marked as deleted",
    type: Boolean,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    description: "The user who last updated this Ztracking node exit",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "The date when the Ztracking node exit version was created",
    type: Date,
  })
  @IsDate()
  versionDate: Date;
}
