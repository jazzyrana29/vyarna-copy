import { PickType } from "@nestjs/swagger";
import { TaskTypeDto } from "./task-type.dto";

export class GetManyTaskTypesDto extends PickType(TaskTypeDto, []) {}
