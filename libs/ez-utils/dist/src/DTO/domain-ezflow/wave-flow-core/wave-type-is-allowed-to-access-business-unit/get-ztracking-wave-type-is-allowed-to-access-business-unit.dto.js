"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const wave_type_is_allowed_to_access_business_unit_dto_1 = require("./wave-type-is-allowed-to-access-business-unit.dto");
class GetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto extends (0, swagger_1.PickType)(wave_type_is_allowed_to_access_business_unit_dto_1.WaveTypeIsAllowedToAccessBusinessUnitDto, ["waveTypeId", "businessUnitId"]) {
}
exports.GetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto = GetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto;
//# sourceMappingURL=get-ztracking-wave-type-is-allowed-to-access-business-unit.dto.js.map