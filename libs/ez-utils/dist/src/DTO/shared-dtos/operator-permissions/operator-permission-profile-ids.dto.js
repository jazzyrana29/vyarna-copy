"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorPermissionProfileIdsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const operator_permission_profile_dto_1 = require("../../domain-multitenant/operator-permissions/operator-permission-profile/operator-permission-profile.dto");
class OperatorPermissionProfileIdsDto extends (0, swagger_1.PickType)(operator_permission_profile_dto_1.OperatorPermissionProfileDto, ["operatorId"]) {
}
exports.OperatorPermissionProfileIdsDto = OperatorPermissionProfileIdsDto;
//# sourceMappingURL=operator-permission-profile-ids.dto.js.map