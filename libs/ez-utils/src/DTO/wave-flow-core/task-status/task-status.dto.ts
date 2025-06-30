import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { WaveExecutesTaskIntoStatusDto } from "../wave-executes-task-into-status/wave-executes-task-into-status.dto";
import { TaskDto } from "../task/task.dto";

export class TaskStatusDto {
  @ApiProperty({
    description: "Unique identifier for the task status",
    required: false,
    example: "ts-1234",
  })
  @IsString()
  @IsOptional()
  taskStatusId: string;

  @ApiProperty({
    description: "Name of the task status",
    maxLength: 50,
    required: true,
    example: "In Progress",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the task status",
    maxLength: 500,
    required: true,
    example: "A task status indicating an ongoing process",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "List of task executions associated with this status",
    required: false,
    isArray: true,
    type: () => WaveExecutesTaskIntoStatusDto,
    example: [],
  })
  @IsOptional()
  @IsArray()
  @Type(() => WaveExecutesTaskIntoStatusDto)
  wavesExecutesTasksIntoStatuses?: WaveExecutesTaskIntoStatusDto[];

  @ApiProperty({
    description: "Indicates if the task status is deleted",
    default: false,
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user who updated the task status",
    nullable: true,
    example: "user-1234",
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Timestamp when the task status was created",
    example: "2024-09-03T12:00:00Z",
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp when the task status was last updated",
    example: "2024-09-03T12:30:00Z",
  })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({
    description: "List of task identifiers associated with this status",
    required: false,
    isArray: true,
    example: [],
  })
  @IsOptional()
  @IsArray()
  @Type(() => TaskDto)
  tasks?: TaskDto[];
}
