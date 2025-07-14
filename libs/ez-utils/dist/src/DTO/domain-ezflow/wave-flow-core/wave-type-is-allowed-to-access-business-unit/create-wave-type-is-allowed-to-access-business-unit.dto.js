"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWaveTypeIsAllowedToAccessBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const wave_type_is_allowed_to_access_business_unit_dto_1 = require("../wave-type-is-allowed-to-access-business-unit/wave-type-is-allowed-to-access-business-unit.dto");
class CreateWaveTypeIsAllowedToAccessBusinessUnitDto extends (0, swagger_1.OmitType)(wave_type_is_allowed_to_access_business_unit_dto_1.WaveTypeIsAllowedToAccessBusinessUnitDto, ["createdAt", "updatedAt", "waveType", "isDeleted"]) {
}
exports.CreateWaveTypeIsAllowedToAccessBusinessUnitDto = CreateWaveTypeIsAllowedToAccessBusinessUnitDto;
//# sourceMappingURL=create-wave-type-is-allowed-to-access-business-unit.dto.js.map