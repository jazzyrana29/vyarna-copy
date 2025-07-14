"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationVariableDataTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const evaluation_operator_id_dto_1 = require("../../../shared-dtos/wave-flow-core/evaluation-operator-id.dto");
const evaluation_variable_id_dto_1 = require("../../../shared-dtos/wave-flow-core/evaluation-variable-id.dto");
class EvaluationVariableDataTypeDto {
}
exports.EvaluationVariableDataTypeDto = EvaluationVariableDataTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the evaluation variable data type",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EvaluationVariableDataTypeDto.prototype, "evaluationVariableDataTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the evaluation variable data type",
        example: "Numeric",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationVariableDataTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the evaluation variable data type",
        example: "This data type is used for numeric evaluations",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationVariableDataTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of evaluation variable IDs associated with this data type",
        type: [evaluation_variable_id_dto_1.EvaluationVariableIdDto],
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => evaluation_variable_id_dto_1.EvaluationVariableIdDto),
    __metadata("design:type", Array)
], EvaluationVariableDataTypeDto.prototype, "evaluationVariables", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of evaluation operator IDs associated with this data type",
        type: [evaluation_operator_id_dto_1.EvaluationOperatorIdDto],
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => evaluation_operator_id_dto_1.EvaluationOperatorIdDto),
    __metadata("design:type", Array)
], EvaluationVariableDataTypeDto.prototype, "evaluationOperators", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the evaluation variable data type is deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EvaluationVariableDataTypeDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID of the user who last updated the data type",
        example: "user-uuid",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EvaluationVariableDataTypeDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the evaluation variable data type was created",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EvaluationVariableDataTypeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the evaluation variable data type was last updated",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EvaluationVariableDataTypeDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=evaluation-variable-data-type.dto.js.map