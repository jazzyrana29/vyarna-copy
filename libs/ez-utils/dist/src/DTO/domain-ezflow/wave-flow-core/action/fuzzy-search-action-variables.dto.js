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
exports.FuzzySearchActionVariablesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const pagination_dto_1 = require("../../../shared-dtos/pagination.dto");
const sort_option_dto_1 = require("../../../shared-dtos/sort-option.dto");
const class_validator_1 = require("class-validator");
class FuzzySearchActionVariablesDto {
    constructor() {
        this.sort = [];
    }
}
exports.FuzzySearchActionVariablesDto = FuzzySearchActionVariablesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Exact match for Action ID (optional)",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchActionVariablesDto.prototype, "actionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for Action ID (optional)",
        example: "123e4567",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchActionVariablesDto.prototype, "fuzzyActionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Exact match for Action Type (optional)",
        example: "SendEmail",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchActionVariablesDto.prototype, "actionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for Action Type (optional)",
        example: "Email",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchActionVariablesDto.prototype, "fuzzyActionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Exact match for Action Name (optional)",
        example: "NotifyUser",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchActionVariablesDto.prototype, "actionName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for Action Name (optional)",
        example: "Notify",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchActionVariablesDto.prototype, "fuzzyActionName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Exact match for Action Variable Name (optional)",
        example: "emailAddress",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchActionVariablesDto.prototype, "actionVariableName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for Action Variable Name (optional)",
        example: "address",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchActionVariablesDto.prototype, "fuzzyActionVariableName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Exact match for Action Variable Data Type (optional)",
        example: "Text",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchActionVariablesDto.prototype, "actionVariableDataType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for Action Variable Data Type (optional)",
        example: "Text",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchActionVariablesDto.prototype, "fuzzyActionVariableDataType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Exact match for Action Variable ID (optional)",
        example: "987e6543-e21b-45d3-a456-426614174999",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchActionVariablesDto.prototype, "actionVariableId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for Action Variable ID (optional)",
        example: "987e6543",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchActionVariablesDto.prototype, "fuzzyActionVariableId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "If present, defines pagination parameters. If omitted or null, no pagination is applied.",
        type: pagination_dto_1.PaginationDto,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => pagination_dto_1.PaginationDto),
    __metadata("design:type", pagination_dto_1.PaginationDto)
], FuzzySearchActionVariablesDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Array of sorting instructions.",
        type: [sort_option_dto_1.SortOptionDto],
        default: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => sort_option_dto_1.SortOptionDto),
    __metadata("design:type", Array)
], FuzzySearchActionVariablesDto.prototype, "sort", void 0);
//# sourceMappingURL=fuzzy-search-action-variables.dto.js.map