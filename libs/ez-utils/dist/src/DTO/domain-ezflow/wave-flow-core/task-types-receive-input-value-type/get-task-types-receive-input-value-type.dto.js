"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneTaskTypesReceiveInputValueTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_types_receive_input_value_type_dto_1 = require("./task-types-receive-input-value-type.dto");
class GetOneTaskTypesReceiveInputValueTypeDto extends (0, swagger_1.PickType)(task_types_receive_input_value_type_dto_1.TaskTypesReceiveInputValueTypeDto, ["taskTypeId", "inputValueTypeId", "isAvailable"]) {
}
exports.GetOneTaskTypesReceiveInputValueTypeDto = GetOneTaskTypesReceiveInputValueTypeDto;
//# sourceMappingURL=get-task-types-receive-input-value-type.dto.js.map