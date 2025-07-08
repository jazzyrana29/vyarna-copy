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
exports.ZtrackingSleepScheduleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingSleepScheduleDto {
}
exports.ZtrackingSleepScheduleDto = ZtrackingSleepScheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingSleepScheduleDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Original schedule id', type: 'string', format: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingSleepScheduleDto.prototype, "scheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Baby identifier', type: 'string', format: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingSleepScheduleDto.prototype, "babyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Day of week (0-6)' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ZtrackingSleepScheduleDto.prototype, "dayOfWeek", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Start of schedule window' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingSleepScheduleDto.prototype, "windowStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End of schedule window' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingSleepScheduleDto.prototype, "windowEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingSleepScheduleDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingSleepScheduleDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingSleepScheduleDto.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of this version', type: String, format: 'date-time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingSleepScheduleDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-sleep-schedule.dto.js.map