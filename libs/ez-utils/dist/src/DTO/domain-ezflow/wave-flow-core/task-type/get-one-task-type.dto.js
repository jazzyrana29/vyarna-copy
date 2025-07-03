"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneTaskTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_type_dto_1 = require("./task-type.dto");
class GetOneTaskTypeDto extends (0, swagger_1.PickType)(task_type_dto_1.TaskTypeDto, [
    "taskTypeId",
    "name",
]) {
}
exports.GetOneTaskTypeDto = GetOneTaskTypeDto;
//# sourceMappingURL=get-one-task-type.dto.js.map