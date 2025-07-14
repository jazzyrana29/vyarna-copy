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
exports.FlowVariablesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class FlowVariablesEvaluationVariableDataTypeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the evaluation variable data type",
        example: "a111f91c-deaf-4a8d-a3f7-c8151f25e1b1",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowVariablesEvaluationVariableDataTypeDto.prototype, "evaluationVariableDataTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the data type (e.g., Numeric, Text, Coordinates)",
        example: "Numeric",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlowVariablesEvaluationVariableDataTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "A brief description of this data type",
        example: "Any numerical value.",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlowVariablesEvaluationVariableDataTypeDto.prototype, "description", void 0);
class FlowVariablesEvaluationVariableDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the evaluation variable",
        example: "e1c2922f-1234-4c6f-a77b-6e2fbbae0555",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowVariablesEvaluationVariableDto.prototype, "evaluationVariableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the evaluation variable",
        example: "temperature",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlowVariablesEvaluationVariableDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "A short description about the variable",
        example: "The ambient temperature in Celsius",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlowVariablesEvaluationVariableDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Data type information for this evaluation variable",
        type: FlowVariablesEvaluationVariableDataTypeDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => FlowVariablesEvaluationVariableDataTypeDto),
    __metadata("design:type", FlowVariablesEvaluationVariableDataTypeDto)
], FlowVariablesEvaluationVariableDto.prototype, "evaluationVariableDataType", void 0);
class FlowVariablesEvaluationOperatorDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the evaluation operator",
        example: "b980f91c-deaf-4a8d-1234-c8151f25e1b1",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowVariablesEvaluationOperatorDto.prototype, "evaluationOperatorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Name of the operator", example: "Greater Than" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlowVariablesEvaluationOperatorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Symbol used by the operator", example: ">" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlowVariablesEvaluationOperatorDto.prototype, "symbol", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Operator description",
        example: "Checks if the left side is greater than the right side",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlowVariablesEvaluationOperatorDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Specifies how choices are handled, e.g. numeric/text",
        example: "numeric",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlowVariablesEvaluationOperatorDto.prototype, "choiceType", void 0);
class FlowVariablesFilterSubsetItemDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the filter subset item",
        example: "3d280628-1f23-4bc8-b2a9-607ea5272f9d",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowVariablesFilterSubsetItemDto.prototype, "filterSubsetItemId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "The evaluation variable used",
        type: FlowVariablesEvaluationVariableDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => FlowVariablesEvaluationVariableDto),
    __metadata("design:type", FlowVariablesEvaluationVariableDto)
], FlowVariablesFilterSubsetItemDto.prototype, "evaluationVariable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "The evaluation operator used",
        type: FlowVariablesEvaluationOperatorDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => FlowVariablesEvaluationOperatorDto),
    __metadata("design:type", FlowVariablesEvaluationOperatorDto)
], FlowVariablesFilterSubsetItemDto.prototype, "evaluationOperator", void 0);
class FlowVariablesFilterSubsetDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the filter subset",
        example: "9f07b4e3-6182-49c4-8599-944b95132738",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowVariablesFilterSubsetDto.prototype, "filterSubsetId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "List of filter subset items",
        type: [FlowVariablesFilterSubsetItemDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FlowVariablesFilterSubsetItemDto),
    __metadata("design:type", Array)
], FlowVariablesFilterSubsetDto.prototype, "filterSubsetItems", void 0);
class FlowVariablesFilterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the filter",
        example: "4fe7f91c-deaf-4a8d-a3f7-c8151f25e1b1",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowVariablesFilterDto.prototype, "filterId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "List of filter subsets in this filter",
        type: [FlowVariablesFilterSubsetDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FlowVariablesFilterSubsetDto),
    __metadata("design:type", Array)
], FlowVariablesFilterDto.prototype, "filterSubsets", void 0);
class FlowVariablesManifoldDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the manifold",
        example: "5fe7f91c-deaf-4a8d-a3f7-c8151f25e1b1",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowVariablesManifoldDto.prototype, "manifoldId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "List of filters for this manifold",
        type: [FlowVariablesFilterDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FlowVariablesFilterDto),
    __metadata("design:type", Array)
], FlowVariablesManifoldDto.prototype, "filters", void 0);
class FlowVariablesNodeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the node",
        example: "d7ef811c-deaf-1234-a3f7-c8151f25e1b1",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowVariablesNodeDto.prototype, "nodeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Manifold associated with this node",
        type: FlowVariablesManifoldDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => FlowVariablesManifoldDto),
    __metadata("design:type", FlowVariablesManifoldDto)
], FlowVariablesNodeDto.prototype, "manifold", void 0);
class FlowVariablesDto {
}
exports.FlowVariablesDto = FlowVariablesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the flow",
        example: "715e291c-deaf-4a8d-a3f7-c8151f25e1b1",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FlowVariablesDto.prototype, "flowId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "List of nodes included in this flow variable snapshot",
        type: [FlowVariablesNodeDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FlowVariablesNodeDto),
    __metadata("design:type", Array)
], FlowVariablesDto.prototype, "nodes", void 0);
//# sourceMappingURL=flow-variables.dto.js.map