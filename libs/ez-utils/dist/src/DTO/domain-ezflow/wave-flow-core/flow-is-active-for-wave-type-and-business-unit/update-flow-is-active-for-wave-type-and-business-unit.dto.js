"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFlowIsActiveForWaveTypeAndBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const flow_is_active_for_wave_type_and_business_unit_dto_1 = require("./flow-is-active-for-wave-type-and-business-unit.dto");
class UpdateFlowIsActiveForWaveTypeAndBusinessUnitDto extends (0, swagger_1.PickType)(flow_is_active_for_wave_type_and_business_unit_dto_1.FlowIsActiveForWaveTypeAndBusinessUnitDto, ["waveTypeId", "businessUnitId", "activeFlowId", "updatedBy"]) {
}
exports.UpdateFlowIsActiveForWaveTypeAndBusinessUnitDto = UpdateFlowIsActiveForWaveTypeAndBusinessUnitDto;
//# sourceMappingURL=update-flow-is-active-for-wave-type-and-business-unit.dto.js.map