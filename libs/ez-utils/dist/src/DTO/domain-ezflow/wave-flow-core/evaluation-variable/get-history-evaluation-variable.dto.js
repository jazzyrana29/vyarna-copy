"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHistoryOfEvaluationVariablesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_dto_1 = require("./evaluation-variable.dto");
class GetHistoryOfEvaluationVariablesDto extends (0, swagger_1.PickType)(evaluation_variable_dto_1.EvaluationVariableDto, ["evaluationVariableId"]) {
}
exports.GetHistoryOfEvaluationVariablesDto = GetHistoryOfEvaluationVariablesDto;
//# sourceMappingURL=get-history-evaluation-variable.dto.js.map