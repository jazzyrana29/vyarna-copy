"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHistoryOfOperatorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const operator_dto_1 = require("./operator.dto");
class GetHistoryOfOperatorDto extends (0, swagger_1.PickType)(operator_dto_1.OperatorDto, [
    "operatorId",
]) {
}
exports.GetHistoryOfOperatorDto = GetHistoryOfOperatorDto;
//# sourceMappingURL=get-history-of-operator.dto.js.map