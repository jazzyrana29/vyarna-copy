"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePermissionProfileManagedThroughMechanismPermitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const permission_profile_managed_through_mechanism_permit_dto_1 = require("./permission-profile-managed-through-mechanism-permit.dto");
class DeletePermissionProfileManagedThroughMechanismPermitDto extends (0, swagger_1.PickType)(permission_profile_managed_through_mechanism_permit_dto_1.PermissionProfileManagedThroughMechanismPermitDto, ["mechanismPermitId", "permissionProfileId"]) {
}
exports.DeletePermissionProfileManagedThroughMechanismPermitDto = DeletePermissionProfileManagedThroughMechanismPermitDto;
//# sourceMappingURL=delete-permission-profile-managed-through-mechanism-permit.dto.js.map