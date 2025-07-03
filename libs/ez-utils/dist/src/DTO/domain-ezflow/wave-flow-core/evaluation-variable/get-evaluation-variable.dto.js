"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneEvaluationVariableDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_dto_1 = require("./evaluation-variable.dto");
class GetOneEvaluationVariableDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(evaluation_variable_dto_1.EvaluationVariableDto, ["evaluationVariableId", "name"])) {
}
exports.GetOneEvaluationVariableDto = GetOneEvaluationVariableDto;
//# sourceMappingURL=get-evaluation-variable.dto.js.map