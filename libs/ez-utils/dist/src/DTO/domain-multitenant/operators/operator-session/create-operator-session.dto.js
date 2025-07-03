"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOperatorSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const operator_session_dto_1 = require("./operator-session.dto");
class CreateOperatorSessionDto extends (0, swagger_1.PickType)(operator_session_dto_1.OperatorSessionDto, [
    "deviceSession",
    "operator",
    "updatedBy",
    "loginTime",
    "logoutTime",
]) {
}
exports.CreateOperatorSessionDto = CreateOperatorSessionDto;
//# sourceMappingURL=create-operator-session.dto.js.map