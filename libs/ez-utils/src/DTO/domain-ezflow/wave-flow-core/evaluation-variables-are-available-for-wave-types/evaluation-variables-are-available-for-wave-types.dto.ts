import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsBoolean,
  IsOptional,
  IsDate,
  IsString,
} from "class-validator";

export class EvaluationVariablesAreAvailableForWaveTypesDto {
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
    description: "Indicates if the variable is available for the wave type",
    example: true,
  })
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({
    description: "Indicates if the record is logically deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user who updated the record",
    example: "user-1234",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Creation timestamp of the record",
    example: "2024-01-01T00:00:00Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Last updated timestamp of the record",
    example: "2024-01-01T12:00:00Z",
  })
  @IsDate()
  updatedAt: Date;
}
