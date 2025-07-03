"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationVariableDataTypeIdDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_data_type_dto_1 = require("../../domain-ezflow/wave-flow-core/evaluation-variable-data-type/evaluation-variable-data-type.dto");
class EvaluationVariableDataTypeIdDto extends (0, swagger_1.PickType)(evaluation_variable_data_type_dto_1.EvaluationVariableDataTypeDto, ["evaluationVariableDataTypeId"]) {
}
exports.EvaluationVariableDataTypeIdDto = EvaluationVariableDataTypeIdDto;
//# sourceMappingURL=evaluation-variable-data-type-id.dto.js.map