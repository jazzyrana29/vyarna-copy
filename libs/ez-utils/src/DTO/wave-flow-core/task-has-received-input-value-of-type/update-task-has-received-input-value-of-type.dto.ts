import { PickType } from "@nestjs/swagger";
import { TaskHasReceiveInputValueOfTypeDto } from "./task-has-received-input-value-of-type.dto";

export class UpdateTaskHasReceivedInputValueOfTypeDto extends PickType(
  TaskHasReceiveInputValueOfTypeDto,
  ["taskId", "inputValueTypeId", "updatedBy"] as const
) {}
