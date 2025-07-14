"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskTypeHaveAccessToBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_type_have_access_to_business_unit_dto_1 = require("../task-type-have-access-to-business-unit/task-type-have-access-to-business-unit.dto");
class UpdateTaskTypeHaveAccessToBusinessUnitDto extends (0, swagger_1.OmitType)(task_type_have_access_to_business_unit_dto_1.TaskTypeHaveAccessToBusinessUnitDto, ["createdAt", "updatedAt", "taskType", "isDeleted"]) {
}
exports.UpdateTaskTypeHaveAccessToBusinessUnitDto = UpdateTaskTypeHaveAccessToBusinessUnitDto;
//# sourceMappingURL=update-task-type-have-access-to-business-unit.dto.js.map