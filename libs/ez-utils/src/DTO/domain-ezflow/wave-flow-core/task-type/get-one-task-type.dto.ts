import { PickType } from "@nestjs/swagger";
import { TaskTypeDto } from "./task-type.dto";

export class GetOneTaskTypeDto extends PickType(TaskTypeDto, [
  "taskTypeId",
  "name",
]) {}
