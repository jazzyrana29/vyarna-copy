"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingTaskTypeHaveAccessToBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_type_have_access_to_business_unit_dto_1 = require("../task-type-have-access-to-business-unit/task-type-have-access-to-business-unit.dto");
class GetZtrackingTaskTypeHaveAccessToBusinessUnitDto extends (0, swagger_1.PickType)(task_type_have_access_to_business_unit_dto_1.TaskTypeHaveAccessToBusinessUnitDto, ["taskTypeId", "businessUnitId"]) {
}
exports.GetZtrackingTaskTypeHaveAccessToBusinessUnitDto = GetZtrackingTaskTypeHaveAccessToBusinessUnitDto;
//# sourceMappingURL=get-ztracking-task-type-have-access-to-business-unit.dto.js.map