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
exports.EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const evaluation_variable_collection_dto_1 = require("../evaluation-variable-collection/evaluation-variable-collection.dto");
const evaluation_variable_dto_1 = require("../evaluation-variable/evaluation-variable.dto");
const class_transformer_1 = require("class-transformer");
class EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto {
}
exports.EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto = EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique ID for the evaluation variable collection grouping",
        example: "d9e7b62c-4f30-4d2d-bb1c-5f2e7b3e14ab",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "evaluationVariableIsGroupedThroughEvaluationVariableCollectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Reference to the evaluation variable collection",
        type: () => evaluation_variable_collection_dto_1.EvaluationVariableCollectionDto,
    }),
    (0, class_transformer_1.Type)(() => evaluation_variable_collection_dto_1.EvaluationVariableCollectionDto),
    __metadata("design:type", evaluation_variable_collection_dto_1.EvaluationVariableCollectionDto)
], EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "evaluationVariableCollection", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Reference to the evaluation variable",
        type: () => evaluation_variable_dto_1.EvaluationVariableDto,
    }),
    (0, class_transformer_1.Type)(() => evaluation_variable_dto_1.EvaluationVariableDto),
    __metadata("design:type", evaluation_variable_dto_1.EvaluationVariableDto)
], EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "evaluationVariable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the record is marked as deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User who last updated the record",
        example: "admin_user",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was last updated",
        example: "2024-09-29T18:30:00.000Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was created",
        example: "2024-09-01T10:00:00.000Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "createdAt", void 0);
//# sourceMappingURL=evaluation-variable-is-grouped-through-evaluation-variable-collection.dto.js.map