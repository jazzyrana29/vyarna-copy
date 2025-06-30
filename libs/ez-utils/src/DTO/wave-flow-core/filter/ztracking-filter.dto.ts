import { ApiProperty } from "@nestjs/swagger";

export class ZtrackingFilterDto {
  @ApiProperty({
    description: "Unique identifier for the tracking version",
    type: "string",
    format: "uuid",
  })
  ztrackingVersion: string;

  @ApiProperty({
    description: "Unique identifier for the filter",
    type: "string",
    format: "uuid",
  })
  filterId: string;

  @ApiProperty({
    description: "Name of the filter",
    type: "string",
    maxLength: 50,
    required: false,
  })
  filterName?: string;

  @ApiProperty({
    description: "Description of the filter",
    type: "string",
    maxLength: 500,
    required: false,
  })
  filterDescription?: string;

  @ApiProperty({
    description: "Indicates whether the filter is active",
    type: "boolean",
    required: false,
  })
  isActive?: boolean;

  @ApiProperty({
    description: "Order of the manifold",
    type: "integer",
    required: false,
  })
  manifoldOrder?: number;

  @ApiProperty({
    description: "Unique identifier for the manifold",
    type: "string",
    format: "uuid",
    required: false,
  })
  manifoldId?: string;

  @ApiProperty({
    description: "Unique identifier for the nodeExit",
    type: "string",
    format: "uuid",
    required: false,
  })
  nodeExitId?: string;

  @ApiProperty({
    description: "Indicates if the filter is deleted",
    type: "boolean",
    default: false,
    required: false,
  })
  isDeleted?: boolean;

  @ApiProperty({
    description: "UUID of the user who last updated the filter",
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
