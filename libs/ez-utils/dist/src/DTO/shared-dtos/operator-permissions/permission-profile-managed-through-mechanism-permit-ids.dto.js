"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionProfileManagedThroughMechanismPermitIdsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const permission_profile_managed_through_mechanism_permit_dto_1 = require("../../domain-multitenant/operator-permissions/permission-profile-managed-through-mechanism-permit/permission-profile-managed-through-mechanism-permit.dto");
class PermissionProfileManagedThroughMechanismPermitIdsDto extends (0, swagger_1.PickType)(permission_profile_managed_through_mechanism_permit_dto_1.PermissionProfileManagedThroughMechanismPermitDto, ["mechanismPermitId"]) {
}
exports.PermissionProfileManagedThroughMechanismPermitIdsDto = PermissionProfileManagedThroughMechanismPermitIdsDto;
//# sourceMappingURL=permission-profile-managed-through-mechanism-permit-ids.dto.js.map