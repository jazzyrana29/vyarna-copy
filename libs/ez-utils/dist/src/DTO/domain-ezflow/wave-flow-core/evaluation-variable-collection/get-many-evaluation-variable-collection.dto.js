"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyEvaluationVariableCollectionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_collection_dto_1 = require("./evaluation-variable-collection.dto");
class GetManyEvaluationVariableCollectionsDto extends (0, swagger_1.PickType)(evaluation_variable_collection_dto_1.EvaluationVariableCollectionDto, ["isDeleted"]) {
}
exports.GetManyEvaluationVariableCollectionsDto = GetManyEvaluationVariableCollectionsDto;
//# sourceMappingURL=get-many-evaluation-variable-collection.dto.js.map