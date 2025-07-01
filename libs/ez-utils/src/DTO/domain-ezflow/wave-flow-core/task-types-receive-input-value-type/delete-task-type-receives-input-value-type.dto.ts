import { PickType } from "@nestjs/swagger";
import { TaskTypesReceiveInputValueTypeDto } from "./task-types-receive-input-value-type.dto";

export class DeleteTaskTypesReceiveInputValueTypeDto extends PickType(
  TaskTypesReceiveInputValueTypeDto,
  ["taskTypeId", "inputValueTypeId"] as const,
) {}
