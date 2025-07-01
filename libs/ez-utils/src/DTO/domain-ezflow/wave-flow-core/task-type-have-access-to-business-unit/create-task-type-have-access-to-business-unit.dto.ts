import { OmitType } from "@nestjs/swagger";
import { TaskTypeHaveAccessToBusinessUnitDto } from "../task-type-have-access-to-business-unit/task-type-have-access-to-business-unit.dto";

export class CreateTaskTypeHaveAccessToBusinessUnitDto extends OmitType(
  TaskTypeHaveAccessToBusinessUnitDto,
  ["createdAt", "updatedAt", "taskType", "isDeleted"],
) {}
