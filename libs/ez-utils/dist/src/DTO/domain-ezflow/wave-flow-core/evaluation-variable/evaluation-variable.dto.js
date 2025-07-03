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
exports.EvaluationVariableDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const evaluation_variable_is_grouped_through_evaluation_variable_collection_id_dto_1 = require("../../../shared-dtos/wave-flow-core/evaluation-variable-is-grouped-through-evaluation-variable-collection-id.dto");
const evaluation_variable_data_type_id_dto_1 = require("../../../shared-dtos/wave-flow-core/evaluation-variable-data-type-id.dto");
class EvaluationValueOptionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "AR", description: "Country or item ID" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationValueOptionDto.prototype, "ID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Argentina", description: "Country or item name" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationValueOptionDto.prototype, "name", void 0);
class EvaluationVariableDto {
}
exports.EvaluationVariableDto = EvaluationVariableDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique ID for the evaluation variable",
        example: "efdb74b8-5f62-4992-8462-cad1f9b36e83",
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EvaluationVariableDto.prototype, "evaluationVariableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the evaluation variable",
        maxLength: 50,
        required: true,
        example: "Profit Margin Ratio",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationVariableDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the evaluation variable",
        maxLength: 500,
        required: true,
        example: "This variable is used to evaluate profit margins.",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationVariableDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the evaluation variable is deleted",
        default: false,
        required: false,
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EvaluationVariableDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the evaluation variable was created",
        required: true,
        example: "2024-09-03T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], EvaluationVariableDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the evaluation variable was last updated",
        required: true,
        example: "2024-09-03T12:30:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], EvaluationVariableDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Related grouped evaluation variable collections",
        required: false,
        isArray: true,
        type: () => evaluation_variable_is_grouped_through_evaluation_variable_collection_id_dto_1.EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto,
        example: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => evaluation_variable_is_grouped_through_evaluation_variable_collection_id_dto_1.EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto),
    __metadata("design:type", Array)
], EvaluationVariableDto.prototype, "evaluationVariableIsGroupedThroughEvaluationVariableCollections", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "DataType ID of the evaluation variable",
        required: true,
        type: String,
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EvaluationVariableDto.prototype, "evaluationVariableDataTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "DataType of the evaluation variable",
        required: true,
        type: () => evaluation_variable_data_type_id_dto_1.EvaluationVariableDataTypeIdDto,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => evaluation_variable_data_type_id_dto_1.EvaluationVariableDataTypeIdDto),
    __metadata("design:type", evaluation_variable_data_type_id_dto_1.EvaluationVariableDataTypeIdDto)
], EvaluationVariableDto.prototype, "evaluationVariableDataType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Optional array of selectable values or evaluation metadata",
        required: false,
        type: [EvaluationValueOptionDto],
        example: [
            { ID: "AR", name: "Argentina" },
            { ID: "CR", name: "Costa Rica" },
            { ID: "DR", name: "Dominican Republic" },
            { ID: "EE", name: "Estonia" },
            { ID: "NL", name: "Netherlands" },
            { ID: "PK", name: "Pakistan" },
            { ID: "ZM", name: "Zimbabwe" },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => EvaluationValueOptionDto),
    __metadata("design:type", Array)
], EvaluationVariableDto.prototype, "evaluationValueOptions", void 0);
//# sourceMappingURL=evaluation-variable.dto.js.map