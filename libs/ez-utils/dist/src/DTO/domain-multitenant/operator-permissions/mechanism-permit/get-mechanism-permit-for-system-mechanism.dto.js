"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMechanismPermitForSystemMechanismDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const mechanism_permit_dto_1 = require("./mechanism-permit.dto");
class GetMechanismPermitForSystemMechanismDto extends (0, swagger_1.PickType)(mechanism_permit_dto_1.MechanismPermitDto, ["systemMechanismId"]) {
}
exports.GetMechanismPermitForSystemMechanismDto = GetMechanismPermitForSystemMechanismDto;
//# sourceMappingURL=get-mechanism-permit-for-system-mechanism.dto.js.map