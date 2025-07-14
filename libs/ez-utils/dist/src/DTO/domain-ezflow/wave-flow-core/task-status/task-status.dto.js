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
exports.TaskStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const wave_executes_task_into_status_dto_1 = require("../wave-executes-task-into-status/wave-executes-task-into-status.dto");
const task_dto_1 = require("../task/task.dto");
class TaskStatusDto {
}
exports.TaskStatusDto = TaskStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the task status",
        required: false,
        example: "ts-1234",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TaskStatusDto.prototype, "taskStatusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the task status",
        maxLength: 50,
        required: true,
        example: "In Progress",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskStatusDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the task status",
        maxLength: 500,
        required: true,
        example: "A task status indicating an ongoing process",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskStatusDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of task executions associated with this status",
        required: false,
        isArray: true,
        type: () => wave_executes_task_into_status_dto_1.WaveExecutesTaskIntoStatusDto,
        example: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => wave_executes_task_into_status_dto_1.WaveExecutesTaskIntoStatusDto),
    __metadata("design:type", Array)
], TaskStatusDto.prototype, "wavesExecutesTasksIntoStatuses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the task status is deleted",
        default: false,
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaskStatusDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who updated the task status",
        nullable: true,
        example: "user-1234",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskStatusDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the task status was created",
        example: "2024-09-03T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], TaskStatusDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the task status was last updated",
        example: "2024-09-03T12:30:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], TaskStatusDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of task identifiers associated with this status",
        required: false,
        isArray: true,
        example: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => task_dto_1.TaskDto),
    __metadata("design:type", Array)
], TaskStatusDto.prototype, "tasks", void 0);
//# sourceMappingURL=task-status.dto.js.map