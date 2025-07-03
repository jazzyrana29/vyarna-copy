"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemovePermissionProfileForAnOperatorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const operator_permission_profile_dto_1 = require("./operator-permission-profile.dto");
class RemovePermissionProfileForAnOperatorDto extends (0, swagger_1.PickType)(operator_permission_profile_dto_1.OperatorPermissionProfileDto, ["permissionProfileId", "operatorId"]) {
}
exports.RemovePermissionProfileForAnOperatorDto = RemovePermissionProfileForAnOperatorDto;
//# sourceMappingURL=remove-permission-profile-for-an-operator.dto.js.map