"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneEvaluationOperatorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_operator_dto_1 = require("./evaluation-operator.dto");
class GetOneEvaluationOperatorDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(evaluation_operator_dto_1.EvaluationOperatorDto, [
    "evaluationOperatorId",
    "name",
    "isDeleted",
])) {
}
exports.GetOneEvaluationOperatorDto = GetOneEvaluationOperatorDto;
//# sourceMappingURL=get-one-evaluation-operator.dto.js.map