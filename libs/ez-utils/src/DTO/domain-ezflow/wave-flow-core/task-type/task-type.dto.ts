import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { TaskDto } from "../task/task.dto";
import { TaskTypesReceiveInputValueTypeDto } from "../task-types-receive-input-value-type/task-types-receive-input-value-type.dto";
import { Type } from "class-transformer";

export class TaskTypeDto {
  @ApiProperty({
    description: "Unique identifier of the task type",
    example: "456e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  taskTypeId: string;

  @ApiProperty({
    description: "Name of the task type",
    example: "Processing Type",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the task type",
    example: "This task type is used for processing tasks",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "List of tasks associated with this task type",
    type: [TaskDto],
  })
  @IsArray()
  tasks: TaskDto[];

  @ApiProperty({
    description: "List of task types receive input value types associated",
    required: false,
    isArray: true,
    example: [],
  })
  @IsOptional()
  @IsArray()
  @Type(() => TaskTypesReceiveInputValueTypeDto)
  taskTypesReceiveInputValueTypes?: TaskTypesReceiveInputValueTypeDto[];

  @ApiProperty({
    description: "Indicates whether the task type is deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "ID of the user who last updated the task type",
    example: "user-uuid",
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "Date when the task type was created",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Date when the task type was last updated",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  updatedAt: Date;
}
