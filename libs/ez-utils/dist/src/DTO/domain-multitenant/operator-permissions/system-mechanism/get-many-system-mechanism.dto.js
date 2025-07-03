"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManySystemMechanismDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const system_mechanism_dto_1 = require("./system-mechanism.dto");
class GetManySystemMechanismDto extends (0, swagger_1.PickType)(system_mechanism_dto_1.SystemMechanismDto, [
    "isDeleted",
]) {
}
exports.GetManySystemMechanismDto = GetManySystemMechanismDto;
//# sourceMappingURL=get-many-system-mechanism.dto.js.map