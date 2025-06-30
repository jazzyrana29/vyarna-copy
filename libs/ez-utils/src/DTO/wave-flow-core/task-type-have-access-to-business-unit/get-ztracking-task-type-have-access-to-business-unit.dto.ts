import { PickType } from "@nestjs/swagger";
import { TaskTypeHaveAccessToBusinessUnitDto } from "../task-type-have-access-to-business-unit/task-type-have-access-to-business-unit.dto";

export class GetZtrackingTaskTypeHaveAccessToBusinessUnitDto extends PickType(
  TaskTypeHaveAccessToBusinessUnitDto,
  ["taskTypeId", "businessUnitId"],
) {}
