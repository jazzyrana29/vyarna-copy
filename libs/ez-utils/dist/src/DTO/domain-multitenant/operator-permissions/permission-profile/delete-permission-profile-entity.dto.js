"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePermissionProfileEntityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const permission_profile_dto_1 = require("./permission-profile.dto");
class DeletePermissionProfileEntityDto extends (0, swagger_1.PickType)(permission_profile_dto_1.PermissionProfileDto, ["permissionProfileId"]) {
}
exports.DeletePermissionProfileEntityDto = DeletePermissionProfileEntityDto;
//# sourceMappingURL=delete-permission-profile-entity.dto.js.map