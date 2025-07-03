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
exports.GetManyWavesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const sort_option_dto_1 = require("../../../shared-dtos/sort-option.dto");
const pagination_dto_1 = require("../../../shared-dtos/pagination.dto");
const class_validator_1 = require("class-validator");
class GetManyWavesDto {
    constructor() {
        this.sort = [];
    }
}
exports.GetManyWavesDto = GetManyWavesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Status of the wave. Allowed values: InExecution, FailedWithError, Completed.",
        example: "InExecution",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetManyWavesDto.prototype, "waveStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Execution flow ID associated with the wave",
        example: "a7c5e254-c96f-4803-b749-9db0f9a94293",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetManyWavesDto.prototype, "executionFlowId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Wave type ID associated with the wave",
        example: "8a7f93f3-413e-4a7a-9275-5d84d61ce295",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetManyWavesDto.prototype, "waveTypeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Indicates if the record is deleted",
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GetManyWavesDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Identifier of the user who last updated the wave",
        example: "user123",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetManyWavesDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Lower bound for the execution start date (inclusive)",
        example: "2023-10-01T00:00:00Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetManyWavesDto.prototype, "executionStartDateFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Upper bound for the execution start date (inclusive)",
        example: "2023-10-02T00:00:00Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetManyWavesDto.prototype, "executionStartDateTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Lower bound for the execution end date (inclusive)",
        example: "2023-10-01T00:00:00Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetManyWavesDto.prototype, "executionEndDateFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Upper bound for the execution end date (inclusive)",
        example: "2023-10-02T00:00:00Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetManyWavesDto.prototype, "executionEndDateTo", void 0);
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
], GetManyWavesDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Array of sorting instructions.",
        type: [sort_option_dto_1.SortOptionDto],
        default: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => sort_option_dto_1.SortOptionDto),
    __metadata("design:type", Array)
], GetManyWavesDto.prototype, "sort", void 0);
//# sourceMappingURL=get-many-waves.dto.js.map