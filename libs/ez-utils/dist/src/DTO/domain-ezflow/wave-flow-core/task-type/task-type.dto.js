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
exports.TaskTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const task_dto_1 = require("../task/task.dto");
const task_types_receive_input_value_type_dto_1 = require("../task-types-receive-input-value-type/task-types-receive-input-value-type.dto");
const class_transformer_1 = require("class-transformer");
class TaskTypeDto {
}
exports.TaskTypeDto = TaskTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier of the task type",
        example: "456e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TaskTypeDto.prototype, "taskTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the task type",
        example: "Processing Type",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the task type",
        example: "This task type is used for processing tasks",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of tasks associated with this task type",
        type: [task_dto_1.TaskDto],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], TaskTypeDto.prototype, "tasks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of task types receive input value types associated",
        required: false,
        isArray: true,
        example: [],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => task_types_receive_input_value_type_dto_1.TaskTypesReceiveInputValueTypeDto),
    __metadata("design:type", Array)
], TaskTypeDto.prototype, "taskTypesReceiveInputValueTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the task type is deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaskTypeDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID of the user who last updated the task type",
        example: "user-uuid",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TaskTypeDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the task type was created",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TaskTypeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the task type was last updated",
        example: "2024-10-01T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TaskTypeDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=task-type.dto.js.map