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
exports.ZtrackingWaveDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingWaveDto {
}
exports.ZtrackingWaveDto = ZtrackingWaveDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for each version snapshot",
        type: String,
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingWaveDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Connection to the original wave entry",
        type: String,
        example: "123e4567-e89b-12d3-a456-426614174001",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingWaveDto.prototype, "waveId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Tracks the execution flow associated with this wave",
        type: String,
        example: "123e4567-e89b-12d3-a456-426614174002",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingWaveDto.prototype, "executionFlowId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Reflect the start date for this version of wave execution",
        type: Date,
        example: "2023-10-01T10:00:00Z",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingWaveDto.prototype, "executionStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Reflect the end date for this version of wave execution",
        type: Date,
        example: "2023-10-01T12:30:00Z",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingWaveDto.prototype, "executionEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Current status at the time of versioning",
        type: String,
        enum: ["InExecution", "FailedWithError", "Completed"],
        example: "InExecution",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingWaveDto.prototype, "waveStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Variables retornadas en este snapshot del wave",
        type: "object",
        additionalProperties: true,
        nullable: true,
        example: { result: "partial", data: [1, 2] },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], ZtrackingWaveDto.prototype, "returnVariables", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Logical deletion state at this version snapshot",
        type: Boolean,
        example: false,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZtrackingWaveDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Initially set creation timestamp",
        type: Date,
        example: "2023-10-01T09:00:00Z",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingWaveDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identity of last updater for audit purposes",
        type: String,
        example: "user-1234",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingWaveDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date and time of this version's creation",
        type: Date,
        example: "2023-10-01T10:30:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingWaveDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-wave.dto.js.map