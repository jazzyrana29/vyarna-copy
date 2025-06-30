import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsBoolean,
  IsOptional,
  IsString,
  IsDate,
} from "class-validator";

export class ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto {
  @ApiProperty({
    description: "Unique version identifier for the ztracking entry",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "Unique identifier for the wave type",
    example: "waveType-1234",
  })
  @IsUUID()
  waveTypeId: string;

  @ApiProperty({
    description: "Unique identifier for the environmental variable",
    example: "envVar-1234",
  })
  @IsUUID()
  environmentalVariableId: string;

  @ApiProperty({
    description:
      "Indicates if the variable was available at the time of versioning",
    example: true,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({
    description: "Indicates if the record is logically deleted",
    example: false,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    description: "Identifier of the user who last updated the entry",
    example: "user-1234",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Creation date of the original entry",
    example: "2024-01-01T00:00:00Z",
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    description: "Version date indicating when this record was created",
    example: "2024-01-01T12:00:00Z",
  })
  @IsDate()
  versionDate: Date;
}
