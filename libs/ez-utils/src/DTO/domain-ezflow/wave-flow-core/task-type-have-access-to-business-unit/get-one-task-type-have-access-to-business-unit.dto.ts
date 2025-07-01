import { PickType } from "@nestjs/swagger";
import { TaskTypeHaveAccessToBusinessUnitDto } from "../task-type-have-access-to-business-unit/task-type-have-access-to-business-unit.dto";

export class GetOneTaskTypeHaveAccessToBusinessUnitDto extends PickType(
  TaskTypeHaveAccessToBusinessUnitDto,
  ["taskTypeId", "businessUnitId", "isDeleted"],
) {}
