import { PickType } from "@nestjs/swagger";
import { TaskStatusDto } from "./task-status.dto"; // Adjust the import path as necessary

export class GetManyTaskStatusesDto extends PickType(TaskStatusDto, [
  "taskStatusId",
  "name",
] as const) {}
