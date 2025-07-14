"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePermissionProfileForAnOperatorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const operator_permission_profile_dto_1 = require("./operator-permission-profile.dto");
class CreatePermissionProfileForAnOperatorDto extends (0, swagger_1.PickType)(operator_permission_profile_dto_1.OperatorPermissionProfileDto, ["operatorId", "permissionProfileId", "updatedBy"]) {
}
exports.CreatePermissionProfileForAnOperatorDto = CreatePermissionProfileForAnOperatorDto;
//# sourceMappingURL=create-permission-profile-for-an-operator.dto.js.map