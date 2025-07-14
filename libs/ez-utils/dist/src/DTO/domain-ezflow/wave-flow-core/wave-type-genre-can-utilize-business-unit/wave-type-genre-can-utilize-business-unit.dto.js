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
exports.WaveTypeGenreCanUtilizeBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const wave_type_genre_dto_1 = require("../wave-type-genre/wave-type-genre.dto");
class WaveTypeGenreCanUtilizeBusinessUnitDto {
}
exports.WaveTypeGenreCanUtilizeBusinessUnitDto = WaveTypeGenreCanUtilizeBusinessUnitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the Wave Type Genre",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], WaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "waveTypeGenreId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the Business Unit",
        example: "654e1234-e89b-42d3-b678-567814174321",
    }),
    __metadata("design:type", String)
], WaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "businessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Details of the Wave Type Genre",
        type: () => wave_type_genre_dto_1.WaveTypeGenreDto,
    }),
    __metadata("design:type", wave_type_genre_dto_1.WaveTypeGenreDto)
], WaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "waveTypeGenre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the Wave Type Genre is active",
        example: true,
    }),
    __metadata("design:type", Boolean)
], WaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the record is deleted",
        example: false,
    }),
    __metadata("design:type", Boolean)
], WaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User who last updated the record",
        example: "admin",
        required: false,
    }),
    __metadata("design:type", String)
], WaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the record was created",
        example: "2024-11-22T10:00:00.000Z",
    }),
    __metadata("design:type", Date)
], WaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the record was last updated",
        example: "2024-11-22T12:00:00.000Z",
    }),
    __metadata("design:type", Date)
], WaveTypeGenreCanUtilizeBusinessUnitDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=wave-type-genre-can-utilize-business-unit.dto.js.map