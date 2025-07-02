import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";

export class TaskHasReceiveInputValueOfTypeDto {
  @ApiProperty({
    description: "Unique identifier for the input value type",
    required: true,
    example: "iv-1234",
  })
  @IsUUID()
  inputValueTypeId: string;

  @ApiProperty({
    description: "Unique identifier for the task",
    required: true,
    example: "task-5678",
  })
  @IsUUID()
  taskId: string;

  @ApiProperty({
    description: "Value of the task input",
    required: true,
    example: "Sample input value",
  })
  @IsString()
  taskInputValue: string;

  @ApiProperty({
    description: "Indicates if the record is deleted",
    default: false,
    required: false,
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user who updated the record",
    nullable: true,
    example: "user-1234",
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Timestamp when the record was created",
    required: true,
    example: "2024-09-03T12:00:00Z",
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp when the record was last updated",
    required: true,
    example: "2024-09-03T12:30:00Z",
  })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}
