import { ApiProperty, PickType } from "@nestjs/swagger";
import { TaskDto } from "./task.dto";
import { IsUUID } from "class-validator";

export class CreateTaskDto extends PickType(TaskDto, [
  "dateStart",
  "dateEnd",
  "updatedBy",
] as const) {
  @ApiProperty({
    description: "Node associated with the task",
    example: "b1dc8009-3c2f-41b3-a374-ebbfe6c87852",
  })
  @IsUUID()
  nodeId: string;

  @ApiProperty({
    description: "Node exit from which the task is executed",
    example: "e37e793d-cbf3-40b6-aa0b-99cd4f84963b",
  })
  @IsUUID()
  isExecutedFromId: string;

  @ApiProperty({
    description: "Current status of the task",
    example: "b367d977-70a8-4e1b-8f55-d2ac3809712a",
  })
  @IsUUID()
  taskStatusId: string;
}
