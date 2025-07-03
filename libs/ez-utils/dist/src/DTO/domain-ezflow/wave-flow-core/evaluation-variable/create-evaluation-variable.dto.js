"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEvaluationVariableDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_dto_1 = require("./evaluation-variable.dto");
class CreateEvaluationVariableDto extends (0, swagger_1.PickType)(evaluation_variable_dto_1.EvaluationVariableDto, [
    "name",
    "description",
    "evaluationVariableDataTypeId",
    "evaluationValueOptions",
]) {
}
exports.CreateEvaluationVariableDto = CreateEvaluationVariableDto;
//# sourceMappingURL=create-evaluation-variable.dto.js.map