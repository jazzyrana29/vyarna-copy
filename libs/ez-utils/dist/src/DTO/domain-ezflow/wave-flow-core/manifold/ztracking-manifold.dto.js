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
exports.ZtrackingManifoldDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ZtrackingManifoldDto {
}
exports.ZtrackingManifoldDto = ZtrackingManifoldDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the tracking version",
        type: "string",
        format: "uuid",
    }),
    __metadata("design:type", String)
], ZtrackingManifoldDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the manifold",
        type: "string",
        format: "uuid",
    }),
    __metadata("design:type", String)
], ZtrackingManifoldDto.prototype, "manifoldId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the manifold",
        type: "string",
        maxLength: 50,
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingManifoldDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the manifold",
        type: "string",
        maxLength: 500,
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingManifoldDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Execution style of the manifold",
        type: "string",
        maxLength: 50,
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingManifoldDto.prototype, "executionStyle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the manifold is deleted",
        type: "boolean",
        default: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], ZtrackingManifoldDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the user who last updated the manifold",
        type: "string",
        format: "uuid",
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingManifoldDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the version was created or last updated",
        type: "string",
        format: "date-time",
    }),
    __metadata("design:type", Date)
], ZtrackingManifoldDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-manifold.dto.js.map