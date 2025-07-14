"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDeviceSessionHistoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const device_session_dto_1 = require("./device-session.dto");
class GetDeviceSessionHistoryDto extends (0, swagger_1.PickType)(device_session_dto_1.DeviceSessionDto, [
    "name",
    "startTime",
    "endTime",
]) {
}
exports.GetDeviceSessionHistoryDto = GetDeviceSessionHistoryDto;
//# sourceMappingURL=get-device-session-history.dto.js.map