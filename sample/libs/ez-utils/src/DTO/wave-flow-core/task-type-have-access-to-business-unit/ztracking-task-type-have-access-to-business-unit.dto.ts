import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsUUID } from "class-validator";

export class ZtrackingTaskTypeHaveAccessToBusinessUnitDto {
  @ApiProperty({
    description: "The unique identifier for the Ztracking version",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "Unique identifier for the Task Type",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  taskTypeId: string;

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
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Date when the record was last updated",
    example: "2024-11-22T12:00:00.000Z",
  })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    description: "The date when the Ztracking node version was created",
    type: Date,
  })
  @IsDate()
  versionDate: Date;
}
