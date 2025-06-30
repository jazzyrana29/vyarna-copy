import { PickType } from "@nestjs/swagger";
import { TaskTypeHaveAccessToBusinessUnitDto } from "../task-type-have-access-to-business-unit/task-type-have-access-to-business-unit.dto";

export class DeleteTaskTypeHaveAccessToBusinessUnitDto extends PickType(
  TaskTypeHaveAccessToBusinessUnitDto,
  ["businessUnitId", "taskTypeId", "updatedBy"],
) {}
