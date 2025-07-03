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
exports.PermissionProfileManagedThroughMechanismPermitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const mechanism_permit_id_dto_1 = require("../../../shared-dtos/operator-permissions/mechanism-permit-id.dto");
const permission_profile_id_dto_1 = require("../../../shared-dtos/operator-permissions/permission-profile-id.dto");
class PermissionProfileManagedThroughMechanismPermitDto {
}
exports.PermissionProfileManagedThroughMechanismPermitDto = PermissionProfileManagedThroughMechanismPermitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the mechanism permit",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PermissionProfileManagedThroughMechanismPermitDto.prototype, "mechanismPermitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the permission profile",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PermissionProfileManagedThroughMechanismPermitDto.prototype, "permissionProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Mechanism permit related to the profile",
        type: () => mechanism_permit_id_dto_1.MechanismPermitIdDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => mechanism_permit_id_dto_1.MechanismPermitIdDto),
    __metadata("design:type", mechanism_permit_id_dto_1.MechanismPermitIdDto)
], PermissionProfileManagedThroughMechanismPermitDto.prototype, "mechanismPermit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission profile associated with the mechanism permit",
        type: () => permission_profile_id_dto_1.PermissionProfileIdDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => permission_profile_id_dto_1.PermissionProfileIdDto),
    __metadata("design:type", permission_profile_id_dto_1.PermissionProfileIdDto)
], PermissionProfileManagedThroughMechanismPermitDto.prototype, "permissionProfile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the permission profile is permitted through the mechanism permit",
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PermissionProfileManagedThroughMechanismPermitDto.prototype, "isPermitted", void 0);
//# sourceMappingURL=permission-profile-managed-through-mechanism-permit.dto.js.map