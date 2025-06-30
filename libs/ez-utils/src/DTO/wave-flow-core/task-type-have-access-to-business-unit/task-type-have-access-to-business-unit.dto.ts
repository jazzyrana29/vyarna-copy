import { ApiProperty } from "@nestjs/swagger";
import { TaskTypeDto } from "../task-type/task-type.dto";

export class TaskTypeHaveAccessToBusinessUnitDto {
  @ApiProperty({
    description: "Unique identifier for the Task Type",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  taskTypeId: string;

  @ApiProperty({
    description: "Unique identifier for the Business Unit",
    example: "654e1234-e89b-42d3-b678-567814174321",
  })
  businessUnitId: string;

  @ApiProperty({
    description: "Details of the Task Type",
    type: () => TaskTypeDto,
  })
  taskType: TaskTypeDto;

  @ApiProperty({
    description: "Indicates whether the record is deleted",
    example: false,
  })
  isDeleted: boolean;

  @ApiProperty({
    description: "User who last updated the record",
    example: "admin",
    required: false,
  })
  updatedBy?: string;

  @ApiProperty({
    description: "Date when the record was created",
    example: "2024-11-22T10:00:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Date when the record was last updated",
    example: "2024-11-22T12:00:00.000Z",
  })
  updatedAt: Date;
}
