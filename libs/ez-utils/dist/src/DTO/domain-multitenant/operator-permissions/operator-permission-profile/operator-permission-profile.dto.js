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
exports.OperatorPermissionProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class OperatorPermissionProfileDto {
}
exports.OperatorPermissionProfileDto = OperatorPermissionProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the operator",
        example: "550e8400-e29b-41d4-a716-446655440000",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OperatorPermissionProfileDto.prototype, "operatorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the permission profile",
        example: "550e8400-e29b-41d4-a716-446655440001",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OperatorPermissionProfileDto.prototype, "permissionProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the record is deleted",
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OperatorPermissionProfileDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User who last updated the record",
        example: "john.doe",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OperatorPermissionProfileDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was created",
        example: "2023-09-11T10:30:00.000Z",
    }),
    __metadata("design:type", Date)
], OperatorPermissionProfileDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Timestamp when the record was last updated",
        example: "2023-09-11T12:45:00.000Z",
    }),
    __metadata("design:type", Date)
], OperatorPermissionProfileDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=operator-permission-profile.dto.js.map