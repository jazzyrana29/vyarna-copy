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
exports.TaskTypesReceiveInputValueTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class TaskTypesReceiveInputValueTypeDto {
}
exports.TaskTypesReceiveInputValueTypeDto = TaskTypesReceiveInputValueTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the task type",
        example: "fe587b38-8a69-426c-b64f-9c6c09bcad41",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TaskTypesReceiveInputValueTypeDto.prototype, "taskTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the input value type",
        example: "57cdfdcd-49c4-4a7e-bcd4-2a7bf105b1d3",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TaskTypesReceiveInputValueTypeDto.prototype, "inputValueTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the input value type is available for the task type",
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaskTypesReceiveInputValueTypeDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the record is logically deleted",
        default: false,
        required: false,
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaskTypesReceiveInputValueTypeDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who last updated",
        nullable: true,
        example: "user-1234",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskTypesReceiveInputValueTypeDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was created",
        example: "2024-09-03T12:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TaskTypesReceiveInputValueTypeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was last updated",
        example: "2024-09-03T12:30:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TaskTypesReceiveInputValueTypeDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=task-types-receive-input-value-type.dto.js.map