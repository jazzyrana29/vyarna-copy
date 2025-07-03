"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneEvaluationVariablesAreAvailableForWaveTypesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variables_are_available_for_wave_types_dto_1 = require("./evaluation-variables-are-available-for-wave-types.dto");
class GetOneEvaluationVariablesAreAvailableForWaveTypesDto extends (0, swagger_1.PickType)(evaluation_variables_are_available_for_wave_types_dto_1.EvaluationVariablesAreAvailableForWaveTypesDto, ["waveTypeId", "environmentalVariableId", "isAvailable"]) {
}
exports.GetOneEvaluationVariablesAreAvailableForWaveTypesDto = GetOneEvaluationVariablesAreAvailableForWaveTypesDto;
//# sourceMappingURL=get-evaluation-variables-are-available-for-wave-types.dto.js.map