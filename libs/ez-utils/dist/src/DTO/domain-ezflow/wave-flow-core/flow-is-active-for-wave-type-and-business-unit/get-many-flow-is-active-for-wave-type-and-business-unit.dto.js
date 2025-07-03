"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyFlowIsActiveForWaveTypeAndBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const flow_is_active_for_wave_type_and_business_unit_dto_1 = require("./flow-is-active-for-wave-type-and-business-unit.dto");
class GetManyFlowIsActiveForWaveTypeAndBusinessUnitDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(flow_is_active_for_wave_type_and_business_unit_dto_1.FlowIsActiveForWaveTypeAndBusinessUnitDto, [
    "activeFlowId",
    "waveTypeId",
    "businessUnitId",
    "isDeleted",
])) {
}
exports.GetManyFlowIsActiveForWaveTypeAndBusinessUnitDto = GetManyFlowIsActiveForWaveTypeAndBusinessUnitDto;
//# sourceMappingURL=get-many-flow-is-active-for-wave-type-and-business-unit.dto.js.map