"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopulatePermissionProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const permission_profile_dto_1 = require("./permission-profile.dto");
class PopulatePermissionProfileDto extends (0, swagger_1.PickType)(permission_profile_dto_1.PermissionProfileDto, [
    "permissionProfileId",
    "operatorPermissionProfiles",
    "permissionProfileManagedThroughMechanismPermits",
]) {
}
exports.PopulatePermissionProfileDto = PopulatePermissionProfileDto;
//# sourceMappingURL=populate-permission-profile.dto.js.map