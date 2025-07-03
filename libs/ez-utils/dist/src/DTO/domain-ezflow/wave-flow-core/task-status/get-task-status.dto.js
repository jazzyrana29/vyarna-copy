"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTaskStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_status_dto_1 = require("./task-status.dto");
class GetTaskStatusDto extends (0, swagger_1.PickType)(task_status_dto_1.TaskStatusDto, [
    "taskStatusId",
    "name",
    "isDeleted",
]) {
}
exports.GetTaskStatusDto = GetTaskStatusDto;
//# sourceMappingURL=get-task-status.dto.js.map