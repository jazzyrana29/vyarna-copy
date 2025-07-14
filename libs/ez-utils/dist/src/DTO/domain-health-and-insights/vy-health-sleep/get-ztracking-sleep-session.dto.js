"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingSleepSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_session_dto_1 = require("./sleep-session.dto");
class GetZtrackingSleepSessionDto extends (0, swagger_1.PickType)(sleep_session_dto_1.SleepSessionDto, ['sessionId']) {
}
exports.GetZtrackingSleepSessionDto = GetZtrackingSleepSessionDto;
//# sourceMappingURL=get-ztracking-sleep-session.dto.js.map