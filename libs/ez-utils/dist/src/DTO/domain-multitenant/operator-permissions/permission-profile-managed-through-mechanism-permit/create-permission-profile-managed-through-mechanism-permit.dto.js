"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePermissionProfileManagedThroughMechanismPermitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const permission_profile_managed_through_mechanism_permit_dto_1 = require("./permission-profile-managed-through-mechanism-permit.dto");
class CreatePermissionProfileManagedThroughMechanismPermitDto extends (0, swagger_1.PickType)(permission_profile_managed_through_mechanism_permit_dto_1.PermissionProfileManagedThroughMechanismPermitDto, ["mechanismPermitId", "permissionProfileId", "isPermitted"]) {
}
exports.CreatePermissionProfileManagedThroughMechanismPermitDto = CreatePermissionProfileManagedThroughMechanismPermitDto;
//# sourceMappingURL=create-permission-profile-managed-through-mechanism-permit.dto.js.map