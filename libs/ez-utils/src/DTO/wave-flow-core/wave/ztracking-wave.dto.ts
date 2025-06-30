import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsDate,
  IsOptional,
  IsString,
  IsBoolean,
  IsObject,
} from "class-validator";

export class ZtrackingWaveDto {
  @ApiProperty({
    description: "Unique identifier for each version snapshot",
    type: String,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "Connection to the original wave entry",
    type: String,
    example: "123e4567-e89b-12d3-a456-426614174001",
  })
  @IsUUID()
  waveId: string;

  @ApiProperty({
    description: "Tracks the execution flow associated with this wave",
    type: String,
    example: "123e4567-e89b-12d3-a456-426614174002",
  })
  @IsUUID()
  executionFlowId: string;

  @ApiProperty({
    description: "Reflect the start date for this version of wave execution",
    type: Date,
    example: "2023-10-01T10:00:00Z",
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  executionStartDate?: Date;

  @ApiProperty({
    description: "Reflect the end date for this version of wave execution",
    type: Date,
    example: "2023-10-01T12:30:00Z",
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  executionEndDate?: Date;

  @ApiProperty({
    description: "Current status at the time of versioning",
    type: String,
    enum: ["InExecution", "FailedWithError", "Completed"],
    example: "InExecution",
  })
  @IsString()
  waveStatus: "InExecution" | "FailedWithError" | "Completed";

  @ApiProperty({
    description: "Variables retornadas en este snapshot del wave",
    type: "object",
    additionalProperties: true,
    nullable: true,
    example: { result: "partial", data: [1, 2] },
  })
  @IsOptional()
  @IsObject()
  returnVariables?: Record<string, any>;

  @ApiProperty({
    description: "Logical deletion state at this version snapshot",
    type: Boolean,
    example: false,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    description: "Initially set creation timestamp",
    type: Date,
    example: "2023-10-01T09:00:00Z",
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    description: "Identity of last updater for audit purposes",
    type: String,
    example: "user-1234",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Date and time of this version's creation",
    type: Date,
    example: "2023-10-01T10:30:00Z",
  })
  @IsDate()
  versionDate: Date;
}
