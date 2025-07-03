"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteWaveTypeIsAllowedToAccessBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const wave_type_is_allowed_to_access_business_unit_dto_1 = require("../wave-type-is-allowed-to-access-business-unit/wave-type-is-allowed-to-access-business-unit.dto");
class DeleteWaveTypeIsAllowedToAccessBusinessUnitDto extends (0, swagger_1.PickType)(wave_type_is_allowed_to_access_business_unit_dto_1.WaveTypeIsAllowedToAccessBusinessUnitDto, ["businessUnitId", "waveTypeId", "updatedBy"]) {
}
exports.DeleteWaveTypeIsAllowedToAccessBusinessUnitDto = DeleteWaveTypeIsAllowedToAccessBusinessUnitDto;
//# sourceMappingURL=delete-wave-type-is-allowed-to-access-business-unit.dto.js.map