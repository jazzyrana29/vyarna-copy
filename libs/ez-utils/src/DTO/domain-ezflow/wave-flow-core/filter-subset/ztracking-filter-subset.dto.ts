import { ApiProperty } from "@nestjs/swagger";

export class ZtrackingFilterSubsetDto {
  @ApiProperty({
    description: "Unique identifier for the tracking version",
    type: "string",
    format: "uuid",
  })
  ztrackingVersion: string;

  @ApiProperty({
    description: "Unique identifier for the filter subset",
    type: "string",
    format: "uuid",
  })
  filterSubsetId: string;

  @ApiProperty({
    description: "Order of the filter subset",
    type: "integer",
    required: false,
  })
  filterOrder?: number;

  @ApiProperty({
    description: "Internal logical binding for the filter subset",
    type: "string",
    maxLength: 50,
    required: false,
  })
  filterSubsetInternalLogicalBinding?: string;

  @ApiProperty({
    description:
      'Logical binding between this filter subset and the next subset ("AND" or "OR")',
    example: "AND",
    type: "string",
    maxLength: 50,
    required: false,
  })
  nextFilterSubsetLogicalBinding?: string;

  @ApiProperty({
    description: "Unique identifier for the associated filter",
    type: "string",
    format: "uuid",
    required: false,
  })
  filterId?: string;

  @ApiProperty({
    description: "Indicates if the subset is deleted",
    type: "boolean",
    default: false,
    required: false,
  })
  isDeleted?: boolean;

  @ApiProperty({
    description: "UUID of the user who last updated the subset",
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
