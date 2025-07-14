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
exports.ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto {
}
exports.ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto = ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The Z-tracking version identifier",
        example: "1.0.0",
    }),
    __metadata("design:type", String)
], ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the Wave Type Genre",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "waveTypeGenreId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the Business Unit",
        example: "654e1234-e89b-42d3-b678-567814174321",
    }),
    __metadata("design:type", String)
], ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "businessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the record is active",
        example: false,
    }),
    __metadata("design:type", Boolean)
], ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the record is deleted",
        example: false,
    }),
    __metadata("design:type", Boolean)
], ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User who last updated the record",
        example: "admin",
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the record was created",
        example: "2024-11-22T10:00:00.000Z",
    }),
    __metadata("design:type", Date)
], ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the record was last updated",
        example: "2024-11-22T12:00:00.000Z",
    }),
    __metadata("design:type", Date)
], ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date associated with the version",
        example: "2024-11-22T08:00:00.000Z",
    }),
    __metadata("design:type", Date)
], ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-wave-type-genre-can-utilize-business-unit.dto.js.map