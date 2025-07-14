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
exports.FuzzySearchEvaluationVariableDataTypesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const evaluation_variable_data_type_dto_1 = require("./evaluation-variable-data-type.dto");
const sort_option_dto_1 = require("../../../shared-dtos/sort-option.dto");
const pagination_dto_1 = require("../../../shared-dtos/pagination.dto");
class FuzzySearchEvaluationVariableDataTypesDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(evaluation_variable_data_type_dto_1.EvaluationVariableDataTypeDto, [
    "name",
    "description",
    "isDeleted",
    "updatedBy",
])) {
    constructor() {
        super(...arguments);
        this.sort = [];
    }
}
exports.FuzzySearchEvaluationVariableDataTypesDto = FuzzySearchEvaluationVariableDataTypesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for the data type's name (optional).",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchEvaluationVariableDataTypesDto.prototype, "fuzzyName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for the data type's description (optional).",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchEvaluationVariableDataTypesDto.prototype, "fuzzyDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Defines pagination parameters (optional).",
        type: pagination_dto_1.PaginationDto,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => pagination_dto_1.PaginationDto),
    __metadata("design:type", pagination_dto_1.PaginationDto)
], FuzzySearchEvaluationVariableDataTypesDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Array of sorting instructions (optional).",
        type: [sort_option_dto_1.SortOptionDto],
        default: [],
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => sort_option_dto_1.SortOptionDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], FuzzySearchEvaluationVariableDataTypesDto.prototype, "sort", void 0);
//# sourceMappingURL=fuzzy-search-evaluation-variable-data-types.dto.js.map