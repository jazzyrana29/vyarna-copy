import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { TaskStatusDto } from "../task-status/task-status.dto"; // Adjust the import path as necessary

export class WaveExecutesTaskIntoStatusDto {
  @ApiProperty({
    description: "Unique identifier for the task status execution",
    required: false,
    example: "wetis-1234",
  })
  @IsString()
  @IsOptional()
  taskStatusId: string;

  @ApiProperty({
    description: "Details of the task status",
    type: () => TaskStatusDto,
    example: {},
  })
  @Type(() => TaskStatusDto)
  taskStatus: TaskStatusDto;
}
