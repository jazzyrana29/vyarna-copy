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
exports.FilterSubsetItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const filter_subset_dto_1 = require("../filter-subset/filter-subset.dto");
const evaluation_variable_dto_1 = require("../evaluation-variable/evaluation-variable.dto");
const evaluation_operator_dto_1 = require("../evaluation-operator/evaluation-operator.dto");
const class_transformer_1 = require("class-transformer");
class FilterSubsetItemDto extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(evaluation_variable_dto_1.EvaluationVariableDto, ["evaluationVariableId"]), (0, swagger_1.PickType)(evaluation_operator_dto_1.EvaluationOperatorDto, ["evaluationOperatorId"])) {
}
exports.FilterSubsetItemDto = FilterSubsetItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the filter subset item",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FilterSubsetItemDto.prototype, "filterSubsetItemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the filter subset",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FilterSubsetItemDto.prototype, "filterSubsetId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Evaluation value for the filter subset item",
        example: "100",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterSubsetItemDto.prototype, "evaluationValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Associated filter subset",
        type: () => filter_subset_dto_1.FilterSubsetDto,
    }),
    (0, class_transformer_1.Type)(() => filter_subset_dto_1.FilterSubsetDto),
    __metadata("design:type", filter_subset_dto_1.FilterSubsetDto)
], FilterSubsetItemDto.prototype, "filterSubset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Associated evaluation variable",
        type: () => evaluation_variable_dto_1.EvaluationVariableDto,
    }),
    (0, class_transformer_1.Type)(() => evaluation_variable_dto_1.EvaluationVariableDto),
    __metadata("design:type", evaluation_variable_dto_1.EvaluationVariableDto)
], FilterSubsetItemDto.prototype, "evaluationVariable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Associated evaluation operator",
        type: () => evaluation_operator_dto_1.EvaluationOperatorDto,
    }),
    (0, class_transformer_1.Type)(() => evaluation_operator_dto_1.EvaluationOperatorDto),
    __metadata("design:type", evaluation_operator_dto_1.EvaluationOperatorDto)
], FilterSubsetItemDto.prototype, "evaluationOperator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the filter subset item is deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FilterSubsetItemDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID of the user who last updated the filter subset item",
        example: "user-uuid",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FilterSubsetItemDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the filter subset item was created",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], FilterSubsetItemDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the filter subset item was last updated",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], FilterSubsetItemDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=filter-subset-item.dto.js.map