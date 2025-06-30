import { PickType } from "@nestjs/swagger";
import { TaskTypesReceiveInputValueTypeDto } from "./task-types-receive-input-value-type.dto";

export class GetManyTaskTypesReceiveInputValueTypeDto extends PickType(
  TaskTypesReceiveInputValueTypeDto,
  ["isDeleted", "isAvailable"] as const
) {}
