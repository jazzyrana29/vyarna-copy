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
exports.ZtrackingSleepEnvironmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingSleepEnvironmentDto {
}
exports.ZtrackingSleepEnvironmentDto = ZtrackingSleepEnvironmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingSleepEnvironmentDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Original environment record id', type: 'string', format: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingSleepEnvironmentDto.prototype, "envId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sleep session identifier', type: 'string', format: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingSleepEnvironmentDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Temperature in Celsius', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZtrackingSleepEnvironmentDto.prototype, "temperatureC", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Humidity percentage', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZtrackingSleepEnvironmentDto.prototype, "humidityPct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Noise level in dB', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZtrackingSleepEnvironmentDto.prototype, "noiseDb", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Light level', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZtrackingSleepEnvironmentDto.prototype, "lightLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Measurement timestamp', type: String, format: 'date-time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingSleepEnvironmentDto.prototype, "recordedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingSleepEnvironmentDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingSleepEnvironmentDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingSleepEnvironmentDto.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of this version', type: String, format: 'date-time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingSleepEnvironmentDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-sleep-environment.dto.js.map