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
exports.ZtrackingPermissionProfileManagedThroughMechanismPermitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingPermissionProfileManagedThroughMechanismPermitDto {
}
exports.ZtrackingPermissionProfileManagedThroughMechanismPermitDto = ZtrackingPermissionProfileManagedThroughMechanismPermitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique version number for the ztracking record",
        type: Number,
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZtrackingPermissionProfileManagedThroughMechanismPermitDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Mechanism permit identifier",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingPermissionProfileManagedThroughMechanismPermitDto.prototype, "mechanismPermitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission profile identifier",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingPermissionProfileManagedThroughMechanismPermitDto.prototype, "permissionProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the permission profile is permitted through the mechanism permit",
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ZtrackingPermissionProfileManagedThroughMechanismPermitDto.prototype, "isPermitted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The version date of the ztracking permission profile managed through mechanism permit",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingPermissionProfileManagedThroughMechanismPermitDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-permission-profile-managed-through-mechanism-permit.dto.js.map