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
exports.TaskHasReceiveInputValueOfTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TaskHasReceiveInputValueOfTypeDto {
}
exports.TaskHasReceiveInputValueOfTypeDto = TaskHasReceiveInputValueOfTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the input value type",
        required: true,
        example: "iv-1234",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TaskHasReceiveInputValueOfTypeDto.prototype, "inputValueTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the task",
        required: true,
        example: "task-5678",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TaskHasReceiveInputValueOfTypeDto.prototype, "taskId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Value of the task input",
        required: true,
        example: "Sample input value",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskHasReceiveInputValueOfTypeDto.prototype, "taskInputValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the record is deleted",
        default: false,
        required: false,
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaskHasReceiveInputValueOfTypeDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who updated the record",
        nullable: true,
        example: "user-1234",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskHasReceiveInputValueOfTypeDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was created",
        required: true,
        example: "2024-09-03T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], TaskHasReceiveInputValueOfTypeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was last updated",
        required: true,
        example: "2024-09-03T12:30:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], TaskHasReceiveInputValueOfTypeDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=task-has-received-input-value-of-type.dto.js.map