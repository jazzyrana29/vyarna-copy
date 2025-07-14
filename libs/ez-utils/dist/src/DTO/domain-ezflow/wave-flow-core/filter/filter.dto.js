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
exports.FilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const manifold_dto_1 = require("../manifold/manifold.dto");
const filter_subset_dto_1 = require("../filter-subset/filter-subset.dto");
const node_exit_dto_1 = require("../node-exit/node-exit.dto");
const class_transformer_1 = require("class-transformer");
class FilterDto {
}
exports.FilterDto = FilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the filter",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FilterDto.prototype, "filterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Name of the filter", example: "Price Filter" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterDto.prototype, "filterName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the filter",
        example: "Filters products by price range",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterDto.prototype, "filterDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the filter is active",
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FilterDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Order in which the filter is shown and executed within the manifold",
        example: 1,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FilterDto.prototype, "manifoldOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Manifold object associated with this filter",
        type: () => manifold_dto_1.ManifoldDto,
    }),
    (0, class_transformer_1.Type)(() => manifold_dto_1.ManifoldDto),
    __metadata("design:type", manifold_dto_1.ManifoldDto)
], FilterDto.prototype, "manifold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the associated manifold",
        example: "manifold-uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FilterDto.prototype, "manifoldId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Filter subsets associated with this filter",
        type: [filter_subset_dto_1.FilterSubsetDto],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], FilterDto.prototype, "filterSubsets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "NodeExit object associated with this filter",
        type: () => node_exit_dto_1.NodeExitDto,
    }),
    (0, class_transformer_1.Type)(() => node_exit_dto_1.NodeExitDto),
    __metadata("design:type", node_exit_dto_1.NodeExitDto)
], FilterDto.prototype, "nodeExit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the associated nodeExit",
        example: "nodeExit-uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FilterDto.prototype, "nodeExitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the filter is deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FilterDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID of the user who last updated the filter",
        example: "user-uuid",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FilterDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the filter was created",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], FilterDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the filter was last updated",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], FilterDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=filter.dto.js.map