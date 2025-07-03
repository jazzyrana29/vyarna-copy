"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSessionIdDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const device_session_dto_1 = require("../../domain-multitenant/operators/device-session/device-session.dto");
class DeviceSessionIdDto extends (0, swagger_1.PickType)(device_session_dto_1.DeviceSessionDto, [
    "deviceSessionId",
]) {
}
exports.DeviceSessionIdDto = DeviceSessionIdDto;
//# sourceMappingURL=device-session-id.dto.js.map