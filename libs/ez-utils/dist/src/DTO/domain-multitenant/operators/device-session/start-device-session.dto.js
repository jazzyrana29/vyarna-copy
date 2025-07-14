"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartDeviceSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const device_session_dto_1 = require("./device-session.dto");
class StartDeviceSessionDto extends (0, swagger_1.PickType)(device_session_dto_1.DeviceSessionDto, [
    "startTime",
    "endTime",
    "ipAddress",
    "userAgent",
    "lastUpdated",
    "name",
    "deviceId",
]) {
}
exports.StartDeviceSessionDto = StartDeviceSessionDto;
//# sourceMappingURL=start-device-session.dto.js.map