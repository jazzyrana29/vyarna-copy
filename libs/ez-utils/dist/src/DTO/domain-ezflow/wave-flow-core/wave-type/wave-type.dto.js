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
exports.WaveTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const wave_dto_1 = require("../wave/wave.dto");
const flow_is_active_for_wave_type_and_business_unit_dto_1 = require("../flow-is-active-for-wave-type-and-business-unit/flow-is-active-for-wave-type-and-business-unit.dto");
const flow_dto_1 = require("../flow/flow.dto");
const wave_type_genre_dto_1 = require("../wave-type-genre/wave-type-genre.dto");
class WaveTypeDto {
}
exports.WaveTypeDto = WaveTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The unique identifier of the wave type",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], WaveTypeDto.prototype, "waveTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The name of the wave type",
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WaveTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "A brief description of the wave type",
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WaveTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The UUID of the genre for this wave type",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], WaveTypeDto.prototype, "waveTypeGenreId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of waves associated with the wave type",
        type: [wave_dto_1.WaveDto],
    }),
    __metadata("design:type", Array)
], WaveTypeDto.prototype, "waves", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The genre of the wave type",
        type: () => wave_type_genre_dto_1.WaveTypeGenreDto,
    }),
    __metadata("design:type", wave_type_genre_dto_1.WaveTypeGenreDto)
], WaveTypeDto.prototype, "waveTypeGenre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of flows associated with the wave type",
        type: [flow_dto_1.FlowDto],
    }),
    __metadata("design:type", Array)
], WaveTypeDto.prototype, "flows", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Associations between wave type and active flow for business units",
        type: [flow_is_active_for_wave_type_and_business_unit_dto_1.FlowIsActiveForWaveTypeAndBusinessUnitDto],
    }),
    __metadata("design:type", Array)
], WaveTypeDto.prototype, "flowIsActiveForWaveTypeAndBusinessUnits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "JSON schema defining the expected input for this wave type",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WaveTypeDto.prototype, "inputSchema", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "JSON schema defining the expected output for this wave type",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WaveTypeDto.prototype, "outputSchema", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the wave type is marked as deleted",
        type: Boolean,
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], WaveTypeDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user who last updated this wave type",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], WaveTypeDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the wave type was created",
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], WaveTypeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the wave type was last updated",
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], WaveTypeDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=wave-type.dto.js.map