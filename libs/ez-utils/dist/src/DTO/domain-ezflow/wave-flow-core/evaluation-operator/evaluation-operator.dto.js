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
exports.EvaluationOperatorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const evaluation_variable_data_type_dto_1 = require("../evaluation-variable-data-type/evaluation-variable-data-type.dto");
class EvaluationOperatorDto {
}
exports.EvaluationOperatorDto = EvaluationOperatorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the evaluation operator",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EvaluationOperatorDto.prototype, "evaluationOperatorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the evaluation operator",
        example: "Greater Than",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationOperatorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Symbol of the operator", example: ">" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationOperatorDto.prototype, "symbol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the evaluation operator",
        example: "This operator is used to check if a value is greater than another.",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationOperatorDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Choice type of the operator",
        example: "Numeric",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationOperatorDto.prototype, "choiceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Associated evaluation variable data types",
        type: [evaluation_variable_data_type_dto_1.EvaluationVariableDataTypeDto],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], EvaluationOperatorDto.prototype, "evaluationVariableDataTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Flag indicating whether the evaluation operator is deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EvaluationOperatorDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who last updated the record",
        example: "user-123",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationOperatorDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the record was created",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EvaluationOperatorDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the record was last updated",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EvaluationOperatorDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=evaluation-operator.dto.js.map