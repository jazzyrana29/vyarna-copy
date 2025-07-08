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
exports.SleepInterruptionReasonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SleepInterruptionReasonDto {
}
exports.SleepInterruptionReasonDto = SleepInterruptionReasonDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SleepInterruptionReasonDto.prototype, "reasonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sleep session identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SleepInterruptionReasonDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reason type', enum: ['HUNGER', 'DIAPER', 'NOISE', 'DISCOMFORT', 'OTHER'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SleepInterruptionReasonDto.prototype, "reasonType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Event timestamp', type: String, format: 'date-time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SleepInterruptionReasonDto.prototype, "eventTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Optional notes', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SleepInterruptionReasonDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SleepInterruptionReasonDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SleepInterruptionReasonDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Soft deletion timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SleepInterruptionReasonDto.prototype, "deletedAt", void 0);
//# sourceMappingURL=sleep-interruption-reason.dto.js.map