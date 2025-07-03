"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const business_unit_dto_1 = require("./business-unit.dto");
class CreateBusinessUnitDto extends (0, swagger_1.PickType)(business_unit_dto_1.BusinessUnitDto, [
    "name",
    "parentBusinessUnitId",
    "children",
    "updatedBy",
]) {
}
exports.CreateBusinessUnitDto = CreateBusinessUnitDto;
//# sourceMappingURL=create-business-unit.dto.js.map