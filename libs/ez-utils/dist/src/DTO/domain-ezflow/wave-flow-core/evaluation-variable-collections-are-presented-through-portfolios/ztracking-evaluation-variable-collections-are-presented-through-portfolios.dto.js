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
exports.ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto {
}
exports.ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto = ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique version identifier for the ztracking",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the relation",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "evaluationVariableCollectionsArePresentedThroughPortfoliosId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Portfolio of evaluation variable collections ID",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "evaluationVariableCollectionPortfolioId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Evaluation variable collection ID",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "evaluationVariableCollectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the record is deleted",
        type: Boolean,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who updated the record",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was created",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was last updated",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The version date of the tracking",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-evaluation-variable-collections-are-presented-through-portfolios.dto.js.map