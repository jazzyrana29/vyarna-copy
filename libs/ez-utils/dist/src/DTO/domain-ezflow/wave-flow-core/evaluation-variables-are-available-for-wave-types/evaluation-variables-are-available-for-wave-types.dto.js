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
exports.EvaluationVariablesAreAvailableForWaveTypesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class EvaluationVariablesAreAvailableForWaveTypesDto {
}
exports.EvaluationVariablesAreAvailableForWaveTypesDto = EvaluationVariablesAreAvailableForWaveTypesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the wave type",
        example: "waveType-1234",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EvaluationVariablesAreAvailableForWaveTypesDto.prototype, "waveTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the environmental variable",
        example: "envVar-1234",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EvaluationVariablesAreAvailableForWaveTypesDto.prototype, "environmentalVariableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the variable is available for the wave type",
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EvaluationVariablesAreAvailableForWaveTypesDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the record is logically deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EvaluationVariablesAreAvailableForWaveTypesDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who updated the record",
        example: "user-1234",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EvaluationVariablesAreAvailableForWaveTypesDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Creation timestamp of the record",
        example: "2024-01-01T00:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EvaluationVariablesAreAvailableForWaveTypesDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Last updated timestamp of the record",
        example: "2024-01-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EvaluationVariablesAreAvailableForWaveTypesDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=evaluation-variables-are-available-for-wave-types.dto.js.map