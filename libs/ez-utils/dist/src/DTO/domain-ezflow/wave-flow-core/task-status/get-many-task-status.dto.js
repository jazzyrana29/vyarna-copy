"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyTaskStatusesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_status_dto_1 = require("./task-status.dto");
class GetManyTaskStatusesDto extends (0, swagger_1.PickType)(task_status_dto_1.TaskStatusDto, [
    "taskStatusId",
    "name",
]) {
}
exports.GetManyTaskStatusesDto = GetManyTaskStatusesDto;
//# sourceMappingURL=get-many-task-status.dto.js.map