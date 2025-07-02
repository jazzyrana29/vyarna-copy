import { PickType } from "@nestjs/swagger";
import { TaskDto } from "./task.dto";

export class DeleteTaskDto extends PickType(TaskDto, ["taskId"] as const) {}
