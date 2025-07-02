import { PickType } from "@nestjs/swagger";
import { TaskHasReceiveInputValueOfTypeDto } from "./task-has-received-input-value-of-type.dto";

export class CreateTaskHasReceivedInputValueOfTypeDto extends PickType(
  TaskHasReceiveInputValueOfTypeDto,
  ["taskId", "inputValueTypeId", "updatedBy"] as const,
) {}
