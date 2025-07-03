"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePermissionProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const permission_profile_dto_1 = require("./permission-profile.dto");
class CreatePermissionProfileDto extends (0, swagger_1.PickType)(permission_profile_dto_1.PermissionProfileDto, [
    "businessUnitId",
    "name",
    "description",
    "updatedBy",
]) {
}
exports.CreatePermissionProfileDto = CreatePermissionProfileDto;
//# sourceMappingURL=create-permission-profile.dto.js.map