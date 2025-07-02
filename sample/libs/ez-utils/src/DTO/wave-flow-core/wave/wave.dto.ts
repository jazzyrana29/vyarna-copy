import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsString,
  IsDate,
  IsOptional,
  IsBoolean,
  ValidateNested,
  IsArray,
  IsObject,
} from "class-validator";
import { Type } from "class-transformer";
import { WaveTypeDto } from "../wave-type/wave-type.dto";
import { FlowDto } from "../flow/flow.dto";
import { TaskDto } from "../task/task.dto";

export class WaveDto {
  @ApiProperty({
    description: "Unique identifier for the wave",
    example: "8a7f93f3-413e-4a7a-9275-5d84d61ce295",
  })
  @IsUUID()
  waveId: string;

  @ApiProperty({
    description: "The wave type associated with this wave",
    type: () => WaveTypeDto,
  })
  @ValidateNested()
  @Type(() => WaveTypeDto)
  waveType: WaveTypeDto;

  @ApiProperty({
    description: "Unique identifier for the wave type",
    example: "8a7f93f3-413e-4a7a-9275-5d84d61ce295",
  })
  @IsUUID()
  waveTypeId: string;

  @ApiProperty({
    description: "Execution flow ID",
    example: "a7c5e254-c96f-4803-b749-9db0f9a94293",
  })
  @IsUUID()
  executionFlowId: string;

  @ApiProperty({
    description: "The execution flow details associated with this wave",
    type: () => FlowDto,
  })
  @ValidateNested()
  @Type(() => FlowDto)
  executionFlow: FlowDto;

  @ApiProperty({
    description: "List of tasks associated with this wave",
    type: () => [TaskDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskDto)
  tasks: TaskDto[];

  @ApiProperty({
    description: "Execution start date",
    example: "2023-10-01T10:00:00Z",
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  executionStartDate?: Date;

  @ApiProperty({
    description: "Execution end date",
    example: "2023-10-01T12:00:00Z",
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  executionEndDate?: Date;

  @ApiProperty({
    description: "Status of the wave",
    enum: ["InExecution", "FailedWithError", "Completed"],
    example: "InExecution",
  })
  @IsString()
  waveStatus: "InExecution" | "FailedWithError" | "Completed";

  @ApiProperty({
    description: "Variables retornadas por el wave",
    type: "object",
    additionalProperties: true,
    nullable: true,
    example: { result: "ok", count: 3 },
  })
  @IsOptional()
  @IsObject()
  returnVariables?: Record<string, any>;

  @ApiProperty({
    description: "Indicates if the record is deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user who last updated the wave",
    nullable: true,
    example: "user123",
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Timestamp when the wave was created",
    example: "2023-10-01T09:00:00Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp when the wave was last updated",
    example: "2023-10-01T11:00:00Z",
  })
  @IsDate()
  updatedAt: Date;
}
