import { PickType } from "@nestjs/swagger";
import { TaskDto } from "./task.dto";

export class GetHistoryTaskDto extends PickType(TaskDto, ["taskId"] as const) {}
