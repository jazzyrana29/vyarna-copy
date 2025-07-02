import { ApiProperty } from "@nestjs/swagger";

export class ZtrackingManifoldDto {
  @ApiProperty({
    description: "Unique identifier for the tracking version",
    type: "string",
    format: "uuid",
  })
  ztrackingVersion: string;

  @ApiProperty({
    description: "Unique identifier for the manifold",
    type: "string",
    format: "uuid",
  })
  manifoldId: string;

  @ApiProperty({
    description: "Name of the manifold",
    type: "string",
    maxLength: 50,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: "Description of the manifold",
    type: "string",
    maxLength: 500,
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: "Execution style of the manifold",
    type: "string",
    maxLength: 50,
    required: false,
  })
  executionStyle?: string;

  @ApiProperty({
    description: "Indicates if the manifold is deleted",
    type: "boolean",
    default: false,
    required: false,
  })
  isDeleted?: boolean;

  @ApiProperty({
    description: "UUID of the user who last updated the manifold",
    type: "string",
    format: "uuid",
    required: false,
  })
  updatedBy?: string;

  @ApiProperty({
    description: "Date when the version was created or last updated",
    type: "string",
    format: "date-time",
  })
  versionDate: Date;
}
