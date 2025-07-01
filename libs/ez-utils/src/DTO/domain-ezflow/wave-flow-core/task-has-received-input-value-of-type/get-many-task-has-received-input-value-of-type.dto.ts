import { PickType } from "@nestjs/swagger";
import { TaskHasReceiveInputValueOfTypeDto } from "./task-has-received-input-value-of-type.dto";

export class GetManyTaskHasReceivedInputValueOfTypeDto extends PickType(
  TaskHasReceiveInputValueOfTypeDto,
  ["isDeleted"] as const
) {}
