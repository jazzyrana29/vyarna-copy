"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneTaskTypeHaveAccessToBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_type_have_access_to_business_unit_dto_1 = require("../task-type-have-access-to-business-unit/task-type-have-access-to-business-unit.dto");
class GetOneTaskTypeHaveAccessToBusinessUnitDto extends (0, swagger_1.PickType)(task_type_have_access_to_business_unit_dto_1.TaskTypeHaveAccessToBusinessUnitDto, ["taskTypeId", "businessUnitId", "isDeleted"]) {
}
exports.GetOneTaskTypeHaveAccessToBusinessUnitDto = GetOneTaskTypeHaveAccessToBusinessUnitDto;
//# sourceMappingURL=get-one-task-type-have-access-to-business-unit.dto.js.map