"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEvaluationVariableDataTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_data_type_dto_1 = require("./evaluation-variable-data-type.dto");
class GetEvaluationVariableDataTypeDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(evaluation_variable_data_type_dto_1.EvaluationVariableDataTypeDto, [
    "evaluationVariableDataTypeId",
    "name",
    "isDeleted",
])) {
}
exports.GetEvaluationVariableDataTypeDto = GetEvaluationVariableDataTypeDto;
//# sourceMappingURL=get-evaluation-variable-data-type.dto.js.map