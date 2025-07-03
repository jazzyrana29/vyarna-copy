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
exports.ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto {
}
exports.ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto = ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique version identifier for the ztracking entry",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the wave type",
        example: "waveType-1234",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto.prototype, "waveTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the environmental variable",
        example: "envVar-1234",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto.prototype, "environmentalVariableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the variable was available at the time of versioning",
        example: true,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the record is logically deleted",
        example: false,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who last updated the entry",
        example: "user-1234",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Creation date of the original entry",
        example: "2024-01-01T00:00:00Z",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Version date indicating when this record was created",
        example: "2024-01-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-evaluation-variables-are-available-for-wave-types.dto.js.map