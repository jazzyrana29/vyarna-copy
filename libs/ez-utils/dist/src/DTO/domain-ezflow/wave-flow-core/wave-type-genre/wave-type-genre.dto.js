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
exports.WaveTypeGenreDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const wave_type_dto_1 = require("../wave-type/wave-type.dto");
class WaveTypeGenreDto {
}
exports.WaveTypeGenreDto = WaveTypeGenreDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the wave type genre",
        example: "789e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], WaveTypeGenreDto.prototype, "waveTypeGenreId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the wave type genre",
        example: "Genre 1",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WaveTypeGenreDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the wave type genre",
        example: "This genre categorizes wave types",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WaveTypeGenreDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of wave types associated with this wave type genre",
        type: [wave_type_dto_1.WaveTypeDto],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], WaveTypeGenreDto.prototype, "waveTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the wave type genre is deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], WaveTypeGenreDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID of the user who last updated the wave type genre",
        example: "user-uuid",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], WaveTypeGenreDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the wave type genre was created",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], WaveTypeGenreDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the wave type genre was last updated",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], WaveTypeGenreDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=wave-type-genre.dto.js.map