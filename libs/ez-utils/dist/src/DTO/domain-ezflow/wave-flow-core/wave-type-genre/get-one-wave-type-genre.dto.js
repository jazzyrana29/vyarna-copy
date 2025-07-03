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
exports.GetOneWaveTypeGenreDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const wave_type_genre_dto_1 = require("./wave-type-genre.dto");
const class_validator_1 = require("class-validator");
class GetOneWaveTypeGenreDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(wave_type_genre_dto_1.WaveTypeGenreDto, ["name"])) {
}
exports.GetOneWaveTypeGenreDto = GetOneWaveTypeGenreDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the wave type genre",
        example: "789e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetOneWaveTypeGenreDto.prototype, "waveTypeGenreId", void 0);
//# sourceMappingURL=get-one-wave-type-genre.dto.js.map