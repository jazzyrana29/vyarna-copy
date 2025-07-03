"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHistoryOfPermissionProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const permission_profile_dto_1 = require("./permission-profile.dto");
class GetHistoryOfPermissionProfileDto extends (0, swagger_1.PickType)(permission_profile_dto_1.PermissionProfileDto, ["permissionProfileId"]) {
}
exports.GetHistoryOfPermissionProfileDto = GetHistoryOfPermissionProfileDto;
//# sourceMappingURL=get-history-of-permission-profile.dto.js.map