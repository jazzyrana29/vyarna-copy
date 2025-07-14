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
exports.GetManyTasksDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const sort_option_dto_1 = require("../../../shared-dtos/sort-option.dto");
const pagination_dto_1 = require("../../../shared-dtos/pagination.dto");
class GetManyTasksDto {
    constructor() {
        this.sort = [];
    }
}
exports.GetManyTasksDto = GetManyTasksDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Unique identifier for the node associated with the task",
        example: "b3f4c82a-12e3-4d6f-89d7-91a2bb7e46ed",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetManyTasksDto.prototype, "nodeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Unique identifier for the wave associated with the task",
        example: "8a7f93f3-413e-4a7a-9275-5d84d61ce295",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetManyTasksDto.prototype, "waveId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Identifier of the user who last updated the task",
        example: "user123",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetManyTasksDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Human‐readable name of the status (matches TaskStatus.name). If set, filters by status name.",
        example: "InExecution",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetManyTasksDto.prototype, "taskStatusName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Indicates if the record is deleted",
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GetManyTasksDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Lower bound for the task start date (inclusive)",
        example: "2023-10-01T00:00:00Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetManyTasksDto.prototype, "dateStartFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Upper bound for the task start date (inclusive)",
        example: "2023-10-02T00:00:00Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetManyTasksDto.prototype, "dateStartTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Lower bound for the task end date (inclusive)",
        example: "2023-10-01T00:00:00Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetManyTasksDto.prototype, "dateEndFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Upper bound for the task end date (inclusive)",
        example: "2023-10-02T00:00:00Z",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetManyTasksDto.prototype, "dateEndTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Pagination parameters. If omitted or null, no pagination is applied.",
        type: pagination_dto_1.PaginationDto,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => pagination_dto_1.PaginationDto),
    __metadata("design:type", pagination_dto_1.PaginationDto)
], GetManyTasksDto.prototype, "pagination", void 0);
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
], GetManyTasksDto.prototype, "sort", void 0);
//# sourceMappingURL=get-many-tasks.dto.js.map