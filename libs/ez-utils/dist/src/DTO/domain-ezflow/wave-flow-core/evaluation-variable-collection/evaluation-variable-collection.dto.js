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
exports.EvaluationVariableCollectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const evaluation_variable_collections_are_presented_through_portfolios_id_dto_1 = require("../../../shared-dtos/wave-flow-core/evaluation-variable-collections-are-presented-through-portfolios-id.dto");
const evaluation_variable_is_grouped_through_evaluation_variable_collection_id_dto_1 = require("../../../shared-dtos/wave-flow-core/evaluation-variable-is-grouped-through-evaluation-variable-collection-id.dto");
class EvaluationVariableCollectionDto {
}
exports.EvaluationVariableCollectionDto = EvaluationVariableCollectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the evaluation variable collection",
        required: false,
        example: "evc-1234",
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EvaluationVariableCollectionDto.prototype, "evaluationVariableCollectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the evaluation variable collection",
        maxLength: 50,
        required: true,
        example: "Financial Metrics Collection",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationVariableCollectionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the evaluation variable collection",
        maxLength: 500,
        required: true,
        example: "A collection of financial metrics used for company evaluation.",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationVariableCollectionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the record is deleted",
        default: false,
        required: false,
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EvaluationVariableCollectionDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who updated the record",
        nullable: true,
        example: "user-1234",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationVariableCollectionDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was created",
        required: true,
        example: "2024-09-03T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], EvaluationVariableCollectionDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was last updated",
        required: true,
        example: "2024-09-03T12:30:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], EvaluationVariableCollectionDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Relations to portfolios",
        required: false,
        isArray: true,
        type: () => evaluation_variable_collections_are_presented_through_portfolios_id_dto_1.EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto,
        example: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => evaluation_variable_collections_are_presented_through_portfolios_id_dto_1.EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto),
    __metadata("design:type", Array)
], EvaluationVariableCollectionDto.prototype, "evaluationVariableCollectionsArePresentedThroughPortfolios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Relations to grouped evaluation variables",
        required: false,
        isArray: true,
        type: () => evaluation_variable_is_grouped_through_evaluation_variable_collection_id_dto_1.EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto,
        example: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => evaluation_variable_is_grouped_through_evaluation_variable_collection_id_dto_1.EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto),
    __metadata("design:type", Array)
], EvaluationVariableCollectionDto.prototype, "evaluationVariableIsGroupedThroughEvaluationVariableCollections", void 0);
//# sourceMappingURL=evaluation-variable-collection.dto.js.map