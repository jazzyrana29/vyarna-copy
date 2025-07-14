"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHistoryTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_dto_1 = require("./task.dto");
class GetHistoryTaskDto extends (0, swagger_1.PickType)(task_dto_1.TaskDto, ["taskId"]) {
}
exports.GetHistoryTaskDto = GetHistoryTaskDto;
//# sourceMappingURL=get-history-task.dto.js.map