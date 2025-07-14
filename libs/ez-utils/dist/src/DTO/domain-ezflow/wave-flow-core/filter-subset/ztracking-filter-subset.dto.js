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
exports.ZtrackingFilterSubsetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ZtrackingFilterSubsetDto {
}
exports.ZtrackingFilterSubsetDto = ZtrackingFilterSubsetDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the tracking version",
        type: "string",
        format: "uuid",
    }),
    __metadata("design:type", String)
], ZtrackingFilterSubsetDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the filter subset",
        type: "string",
        format: "uuid",
    }),
    __metadata("design:type", String)
], ZtrackingFilterSubsetDto.prototype, "filterSubsetId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Order of the filter subset",
        type: "integer",
        required: false,
    }),
    __metadata("design:type", Number)
], ZtrackingFilterSubsetDto.prototype, "filterOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Internal logical binding for the filter subset",
        type: "string",
        maxLength: 50,
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingFilterSubsetDto.prototype, "filterSubsetInternalLogicalBinding", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Logical binding between this filter subset and the next subset ("AND" or "OR")',
        example: "AND",
        type: "string",
        maxLength: 50,
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingFilterSubsetDto.prototype, "nextFilterSubsetLogicalBinding", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the associated filter",
        type: "string",
        format: "uuid",
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingFilterSubsetDto.prototype, "filterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the subset is deleted",
        type: "boolean",
        default: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], ZtrackingFilterSubsetDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the user who last updated the subset",
        type: "string",
        format: "uuid",
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingFilterSubsetDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the version was created or last updated",
        type: "string",
        format: "date-time",
    }),
    __metadata("design:type", Date)
], ZtrackingFilterSubsetDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-filter-subset.dto.js.map