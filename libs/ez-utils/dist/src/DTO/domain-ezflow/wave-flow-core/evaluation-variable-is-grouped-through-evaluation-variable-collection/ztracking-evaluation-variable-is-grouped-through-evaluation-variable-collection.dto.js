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
exports.ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const evaluation_variable_dto_1 = require("../evaluation-variable/evaluation-variable.dto");
const evaluation_variable_collection_dto_1 = require("../evaluation-variable-collection/evaluation-variable-collection.dto");
const class_transformer_1 = require("class-transformer");
class ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto {
}
exports.ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto = ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID for tracking version of the grouped evaluation variable",
        example: "6f5b6e84-6d8b-4fa2-8214-243578ed97a1",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID of the Evaluation Variable Grouping",
        example: "d8b1e5bc-1a65-485f-b8f1-8f02eb6d885f",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "evaluationVariableIsGroupedThroughEvaluationVariableCollectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Reference to the Evaluation Variable Collection",
        type: () => evaluation_variable_collection_dto_1.EvaluationVariableCollectionDto,
    }),
    (0, class_transformer_1.Type)(() => evaluation_variable_collection_dto_1.EvaluationVariableCollectionDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", evaluation_variable_collection_dto_1.EvaluationVariableCollectionDto)
], ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "evaluationVariableCollection", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Reference to the Evaluation Variable",
        type: () => evaluation_variable_dto_1.EvaluationVariableDto,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", evaluation_variable_dto_1.EvaluationVariableDto)
], ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "evaluationVariable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the record is marked as deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User who last updated the record",
        example: "user123",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Version date of the evaluation variable grouping",
        example: "2024-10-04T10:15:00.000Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-evaluation-variable-is-grouped-through-evaluation-variable-collection.dto.js.map