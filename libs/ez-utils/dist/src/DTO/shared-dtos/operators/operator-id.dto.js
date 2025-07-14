"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorIdDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const operator_dto_1 = require("../../domain-multitenant/operators/operator/operator.dto");
class OperatorIdDto extends (0, swagger_1.PickType)(operator_dto_1.OperatorDto, [
    "operatorId",
]) {
}
exports.OperatorIdDto = OperatorIdDto;
//# sourceMappingURL=operator-id.dto.js.map