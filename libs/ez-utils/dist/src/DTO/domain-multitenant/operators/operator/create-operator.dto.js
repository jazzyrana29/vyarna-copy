"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOperatorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const operator_dto_1 = require("./operator.dto");
class CreateOperatorDto extends (0, swagger_1.PickType)(operator_dto_1.OperatorDto, [
    "businessUnitId",
    "username",
    "nameFirst",
    "nameMiddle",
    "nameLast",
    "email",
    "password",
    "updatedBy",
]) {
}
exports.CreateOperatorDto = CreateOperatorDto;
//# sourceMappingURL=create-operator.dto.js.map