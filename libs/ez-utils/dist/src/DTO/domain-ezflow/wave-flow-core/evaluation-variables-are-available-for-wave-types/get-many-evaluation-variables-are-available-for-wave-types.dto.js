"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyEvaluationVariablesAreAvailableForWaveTypesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variables_are_available_for_wave_types_dto_1 = require("./evaluation-variables-are-available-for-wave-types.dto");
class GetManyEvaluationVariablesAreAvailableForWaveTypesDto extends (0, swagger_1.PickType)(evaluation_variables_are_available_for_wave_types_dto_1.EvaluationVariablesAreAvailableForWaveTypesDto, ["isDeleted", "isAvailable"]) {
}
exports.GetManyEvaluationVariablesAreAvailableForWaveTypesDto = GetManyEvaluationVariablesAreAvailableForWaveTypesDto;
//# sourceMappingURL=get-many-evaluation-variables-are-available-for-wave-types.dto.js.map