"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHistoryOfBusinessUnitsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const business_unit_dto_1 = require("./business-unit.dto");
class GetHistoryOfBusinessUnitsDto extends (0, swagger_1.PickType)(business_unit_dto_1.BusinessUnitDto, [
    "businessUnitId",
]) {
}
exports.GetHistoryOfBusinessUnitsDto = GetHistoryOfBusinessUnitsDto;
//# sourceMappingURL=get-history-of-business-units.dto.js.map