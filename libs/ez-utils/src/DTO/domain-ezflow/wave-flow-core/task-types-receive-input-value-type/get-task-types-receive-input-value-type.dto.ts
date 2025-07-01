import { PickType } from "@nestjs/swagger";
import { TaskTypesReceiveInputValueTypeDto } from "./task-types-receive-input-value-type.dto";

export class GetOneTaskTypesReceiveInputValueTypeDto extends PickType(
  TaskTypesReceiveInputValueTypeDto,
  ["taskTypeId", "inputValueTypeId", "isAvailable"] as const,
) {}
