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
exports.ZtrackingTaskHasReceivedInputValueOfTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingTaskHasReceivedInputValueOfTypeDto {
}
exports.ZtrackingTaskHasReceivedInputValueOfTypeDto = ZtrackingTaskHasReceivedInputValueOfTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique version identifier for ztracking of task input values",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingTaskHasReceivedInputValueOfTypeDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the input value type associated with the task",
        example: "472cdead-4a7a-4dfa-9619-94052bfd31ef",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingTaskHasReceivedInputValueOfTypeDto.prototype, "inputValueTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the task associated with this input value type",
        example: "b335a198-b36e-46dd-a44f-58080c5bad83",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingTaskHasReceivedInputValueOfTypeDto.prototype, "taskId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The actual input value received by the task",
        example: "SampleInputValue",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingTaskHasReceivedInputValueOfTypeDto.prototype, "taskInputValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Logical deletion status of this input value type at the time of snapshot",
        example: false,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZtrackingTaskHasReceivedInputValueOfTypeDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Creation timestamp of the original entry",
        example: "2024-01-01T12:00:00Z",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingTaskHasReceivedInputValueOfTypeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who last updated this version",
        example: "user-1234",
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingTaskHasReceivedInputValueOfTypeDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when this version was created for tracking purposes",
        example: "2024-01-01T15:00:00Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingTaskHasReceivedInputValueOfTypeDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-task-has-received-input-value-of-type.dto.js.map