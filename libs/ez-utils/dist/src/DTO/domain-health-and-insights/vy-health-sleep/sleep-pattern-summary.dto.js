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
exports.SleepPatternSummaryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SleepPatternSummaryDto {
}
exports.SleepPatternSummaryDto = SleepPatternSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SleepPatternSummaryDto.prototype, "summaryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Baby identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SleepPatternSummaryDto.prototype, "babyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Period type', enum: ['DAILY', 'WEEKLY'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SleepPatternSummaryDto.prototype, "periodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Period start date', type: String, format: 'date' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SleepPatternSummaryDto.prototype, "periodStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average duration in seconds' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SleepPatternSummaryDto.prototype, "avgDurationS", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average interruptions' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SleepPatternSummaryDto.prototype, "avgInterruptions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sleep efficiency percentage' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SleepPatternSummaryDto.prototype, "sleepEfficiency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SleepPatternSummaryDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SleepPatternSummaryDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=sleep-pattern-summary.dto.js.map