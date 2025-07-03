"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEvaluationVariableCollectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_collection_dto_1 = require("./evaluation-variable-collection.dto");
class UpdateEvaluationVariableCollectionDto extends (0, swagger_1.PickType)(evaluation_variable_collection_dto_1.EvaluationVariableCollectionDto, [
    "evaluationVariableCollectionId",
    "name",
    "description",
    "updatedBy",
]) {
}
exports.UpdateEvaluationVariableCollectionDto = UpdateEvaluationVariableCollectionDto;
//# sourceMappingURL=update-evaluation-variable-collection.dto.js.map