"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutOperatorSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const operator_session_dto_1 = require("./operator-session.dto");
class LogoutOperatorSessionDto extends (0, swagger_1.PickType)(operator_session_dto_1.OperatorSessionDto, [
    "operatorSessionId",
]) {
}
exports.LogoutOperatorSessionDto = LogoutOperatorSessionDto;
//# sourceMappingURL=logout-operator-session.dto.js.map