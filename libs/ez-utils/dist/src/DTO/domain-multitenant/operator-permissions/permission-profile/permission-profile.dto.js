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
exports.PermissionProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const permission_profile_managed_through_mechanism_permit_ids_dto_1 = require("../../../shared-dtos/operator-permissions/permission-profile-managed-through-mechanism-permit-ids.dto");
const operator_permission_profile_ids_dto_1 = require("../../../shared-dtos/operator-permissions/operator-permission-profile-ids.dto");
class PermissionProfileDto {
}
exports.PermissionProfileDto = PermissionProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the permission profile",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PermissionProfileDto.prototype, "permissionProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Business unit identifier associated with the permission profile",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PermissionProfileDto.prototype, "businessUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the permission profile",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PermissionProfileDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the permission profile",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PermissionProfileDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the permission profile is marked as deleted",
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], PermissionProfileDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who last updated the record",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PermissionProfileDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the record was created",
        type: Date,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], PermissionProfileDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the record was last updated",
        type: Date,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], PermissionProfileDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of permission profiles managed through mechanism permits",
        type: () => [permission_profile_managed_through_mechanism_permit_ids_dto_1.PermissionProfileManagedThroughMechanismPermitIdsDto],
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => permission_profile_managed_through_mechanism_permit_ids_dto_1.PermissionProfileManagedThroughMechanismPermitIdsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PermissionProfileDto.prototype, "permissionProfileManagedThroughMechanismPermits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of operator permission profiles associated with the permission profile",
        type: () => [operator_permission_profile_ids_dto_1.OperatorPermissionProfileIdsDto],
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => operator_permission_profile_ids_dto_1.OperatorPermissionProfileIdsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PermissionProfileDto.prototype, "operatorPermissionProfiles", void 0);
//# sourceMappingURL=permission-profile.dto.js.map