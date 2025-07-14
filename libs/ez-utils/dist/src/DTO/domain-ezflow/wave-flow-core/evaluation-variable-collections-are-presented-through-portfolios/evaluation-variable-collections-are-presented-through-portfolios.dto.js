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
exports.EvaluationVariableCollectionsArePresentedThroughPortfoliosDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const evaluation_variable_collection_portfolio_id_dto_1 = require("../../../shared-dtos/wave-flow-core/evaluation-variable-collection-portfolio-id.dto");
const evaluation_variable_collection_id_dto_1 = require("../../../shared-dtos/wave-flow-core/evaluation-variable-collection-id.dto");
class EvaluationVariableCollectionsArePresentedThroughPortfoliosDto {
}
exports.EvaluationVariableCollectionsArePresentedThroughPortfoliosDto = EvaluationVariableCollectionsArePresentedThroughPortfoliosDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the relation of evaluation variable collections through portfolios",
        required: false,
        example: "evcptp-1234",
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "evaluationVariableCollectionsArePresentedThroughPortfoliosId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Portfolio of evaluation variable collections",
        required: true,
        type: () => evaluation_variable_collection_portfolio_id_dto_1.EvaluationVariableCollectionPortfolioIdDto,
    }),
    (0, class_transformer_1.Type)(() => evaluation_variable_collection_portfolio_id_dto_1.EvaluationVariableCollectionPortfolioIdDto),
    __metadata("design:type", evaluation_variable_collection_portfolio_id_dto_1.EvaluationVariableCollectionPortfolioIdDto)
], EvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "evaluationVariableCollectionPortfolio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Evaluation variable collection",
        required: true,
        type: () => evaluation_variable_collection_id_dto_1.EvaluationVariableCollectionIdDto,
    }),
    (0, class_transformer_1.Type)(() => evaluation_variable_collection_id_dto_1.EvaluationVariableCollectionIdDto),
    __metadata("design:type", evaluation_variable_collection_id_dto_1.EvaluationVariableCollectionIdDto)
], EvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "evaluationVariableCollection", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the record is deleted",
        default: false,
        required: false,
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who updated the record",
        nullable: true,
        example: "user-1234",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was created",
        required: true,
        example: "2024-09-03T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], EvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was last updated",
        required: true,
        example: "2024-09-03T12:30:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], EvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=evaluation-variable-collections-are-presented-through-portfolios.dto.js.map