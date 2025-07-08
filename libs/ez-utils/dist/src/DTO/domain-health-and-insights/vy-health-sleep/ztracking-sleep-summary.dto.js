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
exports.ZtrackingSleepSummaryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingSleepSummaryDto {
}
exports.ZtrackingSleepSummaryDto = ZtrackingSleepSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingSleepSummaryDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Original sleep session id', type: 'string', format: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingSleepSummaryDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total sleep time in seconds' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ZtrackingSleepSummaryDto.prototype, "totalSleepSecs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of interruptions' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ZtrackingSleepSummaryDto.prototype, "totalInterruptions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average interruption duration in seconds' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ZtrackingSleepSummaryDto.prototype, "avgInterruptionSecs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longest uninterrupted block in seconds' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ZtrackingSleepSummaryDto.prototype, "longestBlockSecs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sleep efficiency percentage' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZtrackingSleepSummaryDto.prototype, "sleepEfficiency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingSleepSummaryDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingSleepSummaryDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingSleepSummaryDto.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of this version', type: String, format: 'date-time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingSleepSummaryDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-sleep-summary.dto.js.map