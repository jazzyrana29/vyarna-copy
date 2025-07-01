import { ApiProperty } from "@nestjs/swagger";

export class ZtrackingFilterSubsetItemDto {
  @ApiProperty({
    description: "Unique identifier for the tracking version",
    type: "string",
    format: "uuid",
  })
  ztrackingVersion: string;

  @ApiProperty({
    description: "Unique identifier for the filter subset item",
    type: "string",
    format: "uuid",
  })
  filterSubsetItemId: string;

  @ApiProperty({
    description: "Unique identifier for the associated filter subset",
    type: "string",
    format: "uuid",
    required: false,
  })
  filterSubsetId?: string;

  @ApiProperty({
    description: "Unique identifier for the evaluation variable",
    type: "string",
    format: "uuid",
    required: false,
  })
  evaluationVariableId?: string;

  @ApiProperty({
    description: "Unique identifier for the evaluation operator",
    type: "string",
    format: "uuid",
    required: false,
  })
  evaluationOperatorId?: string;

  @ApiProperty({
    description: "The value of the evaluation",
    type: "string",
    maxLength: 500,
    required: false,
  })
  evaluationValue?: string;

  @ApiProperty({
    description: "Indicates if the subset item is deleted",
    type: "boolean",
    default: false,
    required: false,
  })
  isDeleted?: boolean;

  @ApiProperty({
    description: "UUID of the user who last updated the item",
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
