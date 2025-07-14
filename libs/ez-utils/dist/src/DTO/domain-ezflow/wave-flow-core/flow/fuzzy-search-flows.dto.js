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
exports.FuzzySearchFlowsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const flow_dto_1 = require("./flow.dto");
const sort_option_dto_1 = require("../../../shared-dtos/sort-option.dto");
const pagination_dto_1 = require("../../../shared-dtos/pagination.dto");
const class_transformer_1 = require("class-transformer");
class FuzzySearchFlowsDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(flow_dto_1.FlowDto, [
    "name",
    "description",
    "updatedBy",
    "isDeleted",
    "isPublished",
    "waveTypeId",
])) {
    constructor() {
        super(...arguments);
        this.sort = [];
    }
}
exports.FuzzySearchFlowsDto = FuzzySearchFlowsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for Flow name (optional)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchFlowsDto.prototype, "fuzzyName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for Flow description (optional)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchFlowsDto.prototype, "fuzzyDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fuzzy match for the user who updated Flow (optional)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FuzzySearchFlowsDto.prototype, "fuzzyUpdatedBy", void 0);
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
], FuzzySearchFlowsDto.prototype, "pagination", void 0);
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
], FuzzySearchFlowsDto.prototype, "sort", void 0);
//# sourceMappingURL=fuzzy-search-flows.dto.js.map