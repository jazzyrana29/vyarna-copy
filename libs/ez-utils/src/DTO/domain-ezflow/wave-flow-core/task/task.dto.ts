import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsDate,
  IsBoolean,
  IsString,
  IsOptional,
  IsArray,
} from "class-validator";

/**
 * DTO representing the Task entity.
 */
export class TaskDto {
  @ApiProperty({
    description: "Unique identifier for the task",
    example: "9969a892-618e-4245-9ae9-c7a25d8809ab",
  })
  @IsUUID()
  taskId: string;

  @ApiProperty({
    description: "UUID of the Node this Task belongs to",
    example: "f2f0010b-45e3-4323-aad5-48b0f16099ef",
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  nodeId?: string;

  @ApiProperty({
    description: "UUID of the Wave this Task is associated with",
    example: "b0276f6c-0de8-4cee-b502-ef12f6f08888",
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  waveId?: string;

  @ApiProperty({
    description: "UUID of the NodeExit from which this Task was executed",
    example: "e7c3a109-a115-4b61-a086-774e1da2f924",
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  isExecutedFromId?: string;

  @ApiProperty({
    description: "UUID of the current TaskStatus for this Task",
    example: "6af4d913-1e0f-44c2-835d-d1bcc63c3e75",
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  taskStatusId?: string;

  @ApiProperty({
    description: "List of TaskType UUIDs for this Task",
    example: ["99c031b9-498d-4450-9d78-998296d9bf49"],
    nullable: true,
    type: [String],
  })
  @IsOptional()
  @IsUUID("4", { each: true })
  taskTypeIds?: string[];

  @ApiProperty({
    description: "List of NodeExit UUIDs through which this Task exits",
    example: ["eac32efc-9659-4be3-a5c9-4cb3b09e4355"],
    nullable: true,
    type: [String],
  })
  @IsOptional()
  @IsUUID("4", { each: true })
  exitsThroughIds?: string[];

  @ApiProperty({
    description: "Date when the task started",
    example: "2023-10-01T10:00:00Z",
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  dateStart?: Date;

  @ApiProperty({
    description: "Date when the task ended",
    example: "2023-10-01T12:30:00Z",
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  dateEnd?: Date;

  @ApiProperty({
    description: "Indicates if the task is deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user/system who last updated this task",
    example: "user-1234",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Creation timestamp of the task",
    example: "2023-10-01T09:00:00Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Last update timestamp of the task",
    example: "2023-10-01T11:00:00Z",
  })
  @IsDate()
  updatedAt: Date;
}
