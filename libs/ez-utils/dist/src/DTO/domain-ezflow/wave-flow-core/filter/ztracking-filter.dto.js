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
exports.ZtrackingFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ZtrackingFilterDto {
}
exports.ZtrackingFilterDto = ZtrackingFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the tracking version",
        type: "string",
        format: "uuid",
    }),
    __metadata("design:type", String)
], ZtrackingFilterDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the filter",
        type: "string",
        format: "uuid",
    }),
    __metadata("design:type", String)
], ZtrackingFilterDto.prototype, "filterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the filter",
        type: "string",
        maxLength: 50,
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingFilterDto.prototype, "filterName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the filter",
        type: "string",
        maxLength: 500,
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingFilterDto.prototype, "filterDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the filter is active",
        type: "boolean",
        required: false,
    }),
    __metadata("design:type", Boolean)
], ZtrackingFilterDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Order of the manifold",
        type: "integer",
        required: false,
    }),
    __metadata("design:type", Number)
], ZtrackingFilterDto.prototype, "manifoldOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the manifold",
        type: "string",
        format: "uuid",
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingFilterDto.prototype, "manifoldId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the nodeExit",
        type: "string",
        format: "uuid",
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingFilterDto.prototype, "nodeExitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the filter is deleted",
        type: "boolean",
        default: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], ZtrackingFilterDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the user who last updated the filter",
        type: "string",
        format: "uuid",
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingFilterDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the version was created or last updated",
        type: "string",
        format: "date-time",
    }),
    __metadata("design:type", Date)
], ZtrackingFilterDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-filter.dto.js.map