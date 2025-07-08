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
exports.SymptomReportDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SymptomReportDto {
}
exports.SymptomReportDto = SymptomReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SymptomReportDto.prototype, "symptomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Baby identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SymptomReportDto.prototype, "babyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Person identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SymptomReportDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type of symptom' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SymptomReportDto.prototype, "symptomType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Symptom severity', enum: ['MILD', 'MODERATE', 'SEVERE'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SymptomReportDto.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Time symptom was observed', type: String, format: 'date-time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SymptomReportDto.prototype, "eventTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Optional notes', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SymptomReportDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Soft delete flag', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SymptomReportDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SymptomReportDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SymptomReportDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Soft deletion timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SymptomReportDto.prototype, "deletedAt", void 0);
//# sourceMappingURL=symptom-report.dto.js.map