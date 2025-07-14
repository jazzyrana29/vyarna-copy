"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveEvaluationVariableToCollectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_collection_dto_1 = require("../evaluation-variable-collection/evaluation-variable-collection.dto");
const evaluation_variable_dto_1 = require("../evaluation-variable/evaluation-variable.dto");
class RemoveEvaluationVariableToCollectionDto extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(evaluation_variable_collection_dto_1.EvaluationVariableCollectionDto, [
    "evaluationVariableCollectionId",
]), (0, swagger_1.PickType)(evaluation_variable_dto_1.EvaluationVariableDto, ["evaluationVariableId"])) {
}
exports.RemoveEvaluationVariableToCollectionDto = RemoveEvaluationVariableToCollectionDto;
//# sourceMappingURL=remove-evaluation-variable-to-collection.dto.js.map