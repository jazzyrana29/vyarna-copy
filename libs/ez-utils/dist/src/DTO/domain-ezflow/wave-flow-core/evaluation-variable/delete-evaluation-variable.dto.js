"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEvaluationVariableDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_dto_1 = require("./evaluation-variable.dto");
class DeleteEvaluationVariableDto extends (0, swagger_1.PickType)(evaluation_variable_dto_1.EvaluationVariableDto, ["evaluationVariableId"]) {
}
exports.DeleteEvaluationVariableDto = DeleteEvaluationVariableDto;
//# sourceMappingURL=delete-evaluation-variable.dto.js.map