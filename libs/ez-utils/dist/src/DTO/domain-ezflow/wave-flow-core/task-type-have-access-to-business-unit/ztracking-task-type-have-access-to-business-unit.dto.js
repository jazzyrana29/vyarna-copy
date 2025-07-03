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
exports.ZtrackingTaskTypeHaveAccessToBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingTaskTypeHaveAccessToBusinessUnitDto {
}
exports.ZtrackingTaskTypeHaveAccessToBusinessUnitDto = ZtrackingTaskTypeHaveAccessToBusinessUnitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The unique identifier for the Ztracking version",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingTaskTypeHaveAccessToBusinessUnitDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the Task Type",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], ZtrackingTaskTypeHaveAccessToBusinessUnitDto.prototype, "taskTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the Business Unit",
        example: "654e1234-e89b-42d3-b678-567814174321",
    }),
    __metadata("design:type", String)
], ZtrackingTaskTypeHaveAccessToBusinessUnitDto.prototype, "businessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the record is deleted",
        example: false,
    }),
    __metadata("design:type", Boolean)
], ZtrackingTaskTypeHaveAccessToBusinessUnitDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User who last updated the record",
        example: "admin",
        required: false,
    }),
    __metadata("design:type", String)
], ZtrackingTaskTypeHaveAccessToBusinessUnitDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the record was created",
        example: "2024-11-22T10:00:00.000Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingTaskTypeHaveAccessToBusinessUnitDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date when the record was last updated",
        example: "2024-11-22T12:00:00.000Z",
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingTaskTypeHaveAccessToBusinessUnitDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the Ztracking node version was created",
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingTaskTypeHaveAccessToBusinessUnitDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-task-type-have-access-to-business-unit.dto.js.map