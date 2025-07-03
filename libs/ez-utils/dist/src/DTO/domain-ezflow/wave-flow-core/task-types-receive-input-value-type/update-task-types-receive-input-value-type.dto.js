"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskTypesReceiveInputValueTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_types_receive_input_value_type_dto_1 = require("./task-types-receive-input-value-type.dto");
class UpdateTaskTypesReceiveInputValueTypeDto extends (0, swagger_1.PickType)(task_types_receive_input_value_type_dto_1.TaskTypesReceiveInputValueTypeDto, ["taskTypeId", "inputValueTypeId", "isAvailable", "updatedBy"]) {
}
exports.UpdateTaskTypesReceiveInputValueTypeDto = UpdateTaskTypesReceiveInputValueTypeDto;
//# sourceMappingURL=update-task-types-receive-input-value-type.dto.js.map