"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_dto_1 = require("./task.dto");
class GetOneTaskDto extends (0, swagger_1.PickType)(task_dto_1.TaskDto, ["taskId"]) {
}
exports.GetOneTaskDto = GetOneTaskDto;
//# sourceMappingURL=get-task.dto.js.map