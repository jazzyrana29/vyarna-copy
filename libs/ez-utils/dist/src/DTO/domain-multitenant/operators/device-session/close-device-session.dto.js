"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseDeviceSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const device_session_dto_1 = require("./device-session.dto");
class CloseDeviceSessionDto extends (0, swagger_1.PickType)(device_session_dto_1.DeviceSessionDto, [
    "deviceSessionId",
    "startTime",
    "endTime",
    "ipAddress",
    "userAgent",
    "lastUpdated",
    "updatedBy",
]) {
}
exports.CloseDeviceSessionDto = CloseDeviceSessionDto;
//# sourceMappingURL=close-device-session.dto.js.map