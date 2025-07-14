"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneTaskHasReceivedInputValueOfTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_has_received_input_value_of_type_dto_1 = require("./task-has-received-input-value-of-type.dto");
class GetOneTaskHasReceivedInputValueOfTypeDto extends (0, swagger_1.PickType)(task_has_received_input_value_of_type_dto_1.TaskHasReceiveInputValueOfTypeDto, ["taskId", "inputValueTypeId"]) {
}
exports.GetOneTaskHasReceivedInputValueOfTypeDto = GetOneTaskHasReceivedInputValueOfTypeDto;
//# sourceMappingURL=get-task-has-received-input-value-of-type.dto.js.map