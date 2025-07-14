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
exports.EvaluationVariableCollectionPortfolioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const evaluation_variable_collections_are_presented_through_portfolios_id_dto_1 = require("../../../shared-dtos/wave-flow-core/evaluation-variable-collections-are-presented-through-portfolios-id.dto");
class EvaluationVariableCollectionPortfolioDto {
}
exports.EvaluationVariableCollectionPortfolioDto = EvaluationVariableCollectionPortfolioDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the evaluation variable collection portfolio",
        required: false,
        example: "evcp-1234",
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EvaluationVariableCollectionPortfolioDto.prototype, "evaluationVariableCollectionPortfolioId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the business unit",
        required: true,
        example: "bu-5678",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EvaluationVariableCollectionPortfolioDto.prototype, "businessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the evaluation variable collection portfolio",
        maxLength: 50,
        required: true,
        example: "Top Performance Metrics",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationVariableCollectionPortfolioDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the evaluation variable collection portfolio",
        maxLength: 500,
        required: true,
        example: "A portfolio of metrics showing top performance indicators.",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationVariableCollectionPortfolioDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the record is deleted",
        default: false,
        required: false,
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EvaluationVariableCollectionPortfolioDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who updated the record",
        nullable: true,
        example: "user-5678",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationVariableCollectionPortfolioDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was created",
        required: true,
        example: "2024-09-03T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], EvaluationVariableCollectionPortfolioDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was last updated",
        required: true,
        example: "2024-09-03T12:30:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], EvaluationVariableCollectionPortfolioDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Relations to evaluation variable collections presented through portfolios",
        required: false,
        isArray: true,
        type: () => evaluation_variable_collections_are_presented_through_portfolios_id_dto_1.EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto,
        example: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => evaluation_variable_collections_are_presented_through_portfolios_id_dto_1.EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto),
    __metadata("design:type", Array)
], EvaluationVariableCollectionPortfolioDto.prototype, "evaluationVariableCollectionsArePresentedThroughPortfolios", void 0);
//# sourceMappingURL=evaluation-variable-collection-portfolio.dto.js.map