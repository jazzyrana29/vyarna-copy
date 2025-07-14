"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHistoryOfEvaluationVariableCollectionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_collection_dto_1 = require("./evaluation-variable-collection.dto");
class GetHistoryOfEvaluationVariableCollectionsDto extends (0, swagger_1.PickType)(evaluation_variable_collection_dto_1.EvaluationVariableCollectionDto, ["evaluationVariableCollectionId"]) {
}
exports.GetHistoryOfEvaluationVariableCollectionsDto = GetHistoryOfEvaluationVariableCollectionsDto;
//# sourceMappingURL=get-history-evaluation-variable-collection.dto.js.map