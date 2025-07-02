import { PickType } from "@nestjs/swagger";
import { TaskHasReceiveInputValueOfTypeDto } from "./task-has-received-input-value-of-type.dto";

export class DeleteTaskHasReceivedInputValueOfTypeDto extends PickType(
  TaskHasReceiveInputValueOfTypeDto,
  ["taskId", "inputValueTypeId"] as const,
) {}
