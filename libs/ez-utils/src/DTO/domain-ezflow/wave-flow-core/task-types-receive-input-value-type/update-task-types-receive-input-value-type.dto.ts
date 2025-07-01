import { PickType } from "@nestjs/swagger";
import { TaskTypesReceiveInputValueTypeDto } from "./task-types-receive-input-value-type.dto";

export class UpdateTaskTypesReceiveInputValueTypeDto extends PickType(
  TaskTypesReceiveInputValueTypeDto,
  ["taskTypeId", "inputValueTypeId", "isAvailable", "updatedBy"] as const,
) {}
