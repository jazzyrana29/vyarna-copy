"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSleepSessionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_session_dto_1 = require("./sleep-session.dto");
class GetSleepSessionsDto extends (0, swagger_1.PickType)(sleep_session_dto_1.SleepSessionDto, ['babyId']) {
}
exports.GetSleepSessionsDto = GetSleepSessionsDto;
//# sourceMappingURL=get-sleep-sessions.dto.js.map