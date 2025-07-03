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
exports.WaveDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const wave_type_dto_1 = require("../wave-type/wave-type.dto");
const flow_dto_1 = require("../flow/flow.dto");
const task_dto_1 = require("../task/task.dto");
class WaveDto {
}
exports.WaveDto = WaveDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the wave",
        example: "8a7f93f3-413e-4a7a-9275-5d84d61ce295",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], WaveDto.prototype, "waveId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The wave type associated with this wave",
        type: () => wave_type_dto_1.WaveTypeDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => wave_type_dto_1.WaveTypeDto),
    __metadata("design:type", wave_type_dto_1.WaveTypeDto)
], WaveDto.prototype, "waveType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the wave type",
        example: "8a7f93f3-413e-4a7a-9275-5d84d61ce295",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], WaveDto.prototype, "waveTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Execution flow ID",
        example: "a7c5e254-c96f-4803-b749-9db0f9a94293",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], WaveDto.prototype, "executionFlowId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The execution flow details associated with this wave",
        type: () => flow_dto_1.FlowDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => flow_dto_1.FlowDto),
    __metadata("design:type", flow_dto_1.FlowDto)
], WaveDto.prototype, "executionFlow", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of tasks associated with this wave",
        type: () => [task_dto_1.TaskDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => task_dto_1.TaskDto),
    __metadata("design:type", Array)
], WaveDto.prototype, "tasks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Execution start date",
        example: "2023-10-01T10:00:00Z",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], WaveDto.prototype, "executionStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Execution end date",
        example: "2023-10-01T12:00:00Z",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], WaveDto.prototype, "executionEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Status of the wave",
        enum: ["InExecution", "FailedWithError", "Completed"],
        example: "InExecution",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WaveDto.prototype, "waveStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Variables retornadas por el wave",
        type: "object",
        additionalProperties: true,
        nullable: true,
        example: { result: "ok", count: 3 },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], WaveDto.prototype, "returnVariables", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the record is deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], WaveDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who last updated the wave",
        nullable: true,
        example: "user123",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WaveDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the wave was created",
        example: "2023-10-01T09:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], WaveDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the wave was last updated",
        example: "2023-10-01T11:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], WaveDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=wave.dto.js.map