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
exports.FuzzySearchEvaluationOperatorsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const evaluation_operator_dto_1 = require("./evaluation-operator.dto");
const sort_option_dto_1 = require("../../../shared-dtos/sort-option.dto");
const pagination_dto_1 = require("../../../shared-dtos/pagination.dto");
class FuzzySearchEvaluationOperatorsDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(evaluation_operator_dto_1.EvaluationOperatorDto, [
    "name",
    "symbol",
    "description",
    "choiceType",
    "isDeleted",
    "updatedBy",
])) {
    constructor() {
        super(...arguments);
        this.sort = [];
    }
}
exports.FuzzySearchEvaluationOperatorsDto = FuzzySearchEvaluationOperatorsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for operator name (optional)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchEvaluationOperatorsDto.prototype, "fuzzyName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for operator symbol (optional)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchEvaluationOperatorsDto.prototype, "fuzzySymbol", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for operator description (optional)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchEvaluationOperatorsDto.prototype, "fuzzyDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "If present, defines pagination parameters. If omitted or null, no pagination is applied.",
        type: pagination_dto_1.PaginationDto,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => pagination_dto_1.PaginationDto),
    __metadata("design:type", pagination_dto_1.PaginationDto)
], FuzzySearchEvaluationOperatorsDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Array of sorting instructions.",
        type: [sort_option_dto_1.SortOptionDto],
        default: [],
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => sort_option_dto_1.SortOptionDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], FuzzySearchEvaluationOperatorsDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filter by a specific EvaluationVariableDataType ID",
        example: "ed3c7063-b0f9-42a0-a044-5924bff894c5",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FuzzySearchEvaluationOperatorsDto.prototype, "evaluationVariableDataTypeId", void 0);
//# sourceMappingURL=fuzzy-search-evaluation-operators.dto.js.map