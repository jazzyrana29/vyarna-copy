"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneEvaluationVariableCollectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_collection_dto_1 = require("./evaluation-variable-collection.dto");
class GetOneEvaluationVariableCollectionDto extends (0, swagger_1.PickType)(evaluation_variable_collection_dto_1.EvaluationVariableCollectionDto, ["evaluationVariableCollectionId", "name"]) {
}
exports.GetOneEvaluationVariableCollectionDto = GetOneEvaluationVariableCollectionDto;
//# sourceMappingURL=get-evaluation-variable-collection.dto.js.map