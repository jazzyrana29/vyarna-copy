import { ApiProperty } from "@nestjs/swagger";

export class ZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto {
  @ApiProperty({
    description: "The Z-tracking version identifier",
    type: String,
    format: "uuid",
  })
  ztrackingVersion: string;

  @ApiProperty({
    description: "Unique identifier for the Wave Type",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  waveTypeId: string;

  @ApiProperty({
    description: "Unique identifier for the Business Unit",
    example: "654e1234-e89b-42d3-b678-567814174321",
  })
  businessUnitId: string;

  @ApiProperty({
    description: "Indicates whether the record is deleted",
    example: false,
  })
  isDeleted: boolean;

  @ApiProperty({
    description: "User who last updated the record",
    example: "admin",
    required: false,
  })
  updatedBy?: string;

  @ApiProperty({
    description: "Date when the record was created",
    example: "2024-11-22T10:00:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Date when the record was last updated",
    example: "2024-11-22T12:00:00.000Z",
  })
  updatedAt: Date;

  @ApiProperty({
    description: "The date associated with the version",
    example: "2024-11-22T08:00:00.000Z",
  })
  versionDate: Date;
}
