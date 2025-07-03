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
exports.FilterSubsetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const filter_subset_item_dto_1 = require("../filter-subset-item/filter-subset-item.dto");
const filter_dto_1 = require("../filter/filter.dto");
const class_transformer_1 = require("class-transformer");
class FilterSubsetDto {
}
exports.FilterSubsetDto = FilterSubsetDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the filter subset",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FilterSubsetDto.prototype, "filterSubsetId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the filter",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FilterSubsetDto.prototype, "filterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Order in which the filter subset is shown and executed within the filter",
        example: 1,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FilterSubsetDto.prototype, "filterOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Logical binding for filter subset items ("AND" or "OR")',
        example: "AND",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterSubsetDto.prototype, "filterSubsetInternalLogicalBinding", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Logical binding between this filter subset and the next subset ("AND" or "OR")',
        example: "OR",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterSubsetDto.prototype, "nextFilterSubsetLogicalBinding", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Filter associated with the filter subset",
        type: () => filter_dto_1.FilterDto,
    }),
    (0, class_transformer_1.Type)(() => filter_dto_1.FilterDto),
    __metadata("design:type", filter_dto_1.FilterDto)
], FilterSubsetDto.prototype, "filter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Filter subset items associated with the filter subset",
        type: [filter_subset_item_dto_1.FilterSubsetItemDto],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], FilterSubsetDto.prototype, "filterSubsetItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the filter subset is deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FilterSubsetDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID of the user who last updated the filter subset",
        example: "user-uuid",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FilterSubsetDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the filter subset was created",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], FilterSubsetDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the filter subset was last updated",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], FilterSubsetDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=filter-subset.dto.js.map