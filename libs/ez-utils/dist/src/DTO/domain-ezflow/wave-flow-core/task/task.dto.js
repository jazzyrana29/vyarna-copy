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
exports.TaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class TaskDto {
}
exports.TaskDto = TaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the task",
        example: "9969a892-618e-4245-9ae9-c7a25d8809ab",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TaskDto.prototype, "taskId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the Node this Task belongs to",
        example: "f2f0010b-45e3-4323-aad5-48b0f16099ef",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TaskDto.prototype, "nodeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the Wave this Task is associated with",
        example: "b0276f6c-0de8-4cee-b502-ef12f6f08888",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TaskDto.prototype, "waveId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the NodeExit from which this Task was executed",
        example: "e7c3a109-a115-4b61-a086-774e1da2f924",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TaskDto.prototype, "isExecutedFromId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "UUID of the current TaskStatus for this Task",
        example: "6af4d913-1e0f-44c2-835d-d1bcc63c3e75",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TaskDto.prototype, "taskStatusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of TaskType UUIDs for this Task",
        example: ["99c031b9-498d-4450-9d78-998296d9bf49"],
        nullable: true,
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)("4", { each: true }),
    __metadata("design:type", Array)
], TaskDto.prototype, "taskTypeIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of NodeExit UUIDs through which this Task exits",
        example: ["eac32efc-9659-4be3-a5c9-4cb3b09e4355"],
        nullable: true,
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)("4", { each: true }),
    __metadata("design:type", Array)
], TaskDto.prototype, "exitsThroughIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the task started",
        example: "2023-10-01T10:00:00Z",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TaskDto.prototype, "dateStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the task ended",
        example: "2023-10-01T12:30:00Z",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TaskDto.prototype, "dateEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the task is deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaskDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user/system who last updated this task",
        example: "user-1234",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Creation timestamp of the task",
        example: "2023-10-01T09:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TaskDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Last update timestamp of the task",
        example: "2023-10-01T11:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TaskDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=task.dto.js.map