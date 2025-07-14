"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_dto_1 = require("./task.dto");
class DeleteTaskDto extends (0, swagger_1.PickType)(task_dto_1.TaskDto, ["taskId"]) {
}
exports.DeleteTaskDto = DeleteTaskDto;
//# sourceMappingURL=delete-task.dto.js.map