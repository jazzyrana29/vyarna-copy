import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsBoolean,
  IsOptional,
  IsString,
  IsDate,
} from "class-validator";

export class ZtrackingTaskTypeReceivesInputValueTypeDto {
  @ApiProperty({
    description: "Unique version identifier for tracking the ztracking history",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description:
      "Unique identifier for the task type linked to the input value type",
    example: "taskType-1234",
  })
  @IsUUID()
  taskTypeId: string;

  @ApiProperty({
    description: "Unique identifier for the input value type",
    example: "inputValueType-1234",
  })
  @IsUUID()
  inputValueTypeId: string;

  @ApiProperty({
    description:
      "Availability status of the task type for the input value type at the time of ztracking",
    example: true,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiProperty({
    description: "Logical deletion status at the time of ztracking",
    example: false,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    description: "Identifier of the user who last updated this version",
    example: "user-1234",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Timestamp indicating when the original entity was created",
    example: "2024-01-01T10:00:00Z",
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    description: "Timestamp when this version of the record was created",
    example: "2024-01-01T12:00:00Z",
  })
  @IsDate()
  versionDate: Date;
}
