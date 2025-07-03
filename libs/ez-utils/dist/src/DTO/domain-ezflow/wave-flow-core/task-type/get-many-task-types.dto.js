"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyTaskTypesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_type_dto_1 = require("./task-type.dto");
class GetManyTaskTypesDto extends (0, swagger_1.PickType)(task_type_dto_1.TaskTypeDto, []) {
}
exports.GetManyTaskTypesDto = GetManyTaskTypesDto;
//# sourceMappingURL=get-many-task-types.dto.js.map