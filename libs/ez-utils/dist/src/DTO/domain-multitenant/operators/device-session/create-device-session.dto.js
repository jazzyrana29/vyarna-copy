"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeviceSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const device_session_dto_1 = require("./device-session.dto");
class CreateDeviceSessionDto extends (0, swagger_1.PickType)(device_session_dto_1.DeviceSessionDto, [
    "ipAddress",
    "userAgent",
    "name",
    "deviceId",
    "updatedBy",
]) {
}
exports.CreateDeviceSessionDto = CreateDeviceSessionDto;
//# sourceMappingURL=create-device-session.dto.js.map