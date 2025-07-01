import { PickType } from "@nestjs/swagger";
import { TaskDto } from "./task.dto";

export class GetOneTaskDto extends PickType(TaskDto, ["taskId"] as const) {}
