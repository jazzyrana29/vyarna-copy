"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSleepSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_session_dto_1 = require("./sleep-session.dto");
class DeleteSleepSessionDto extends (0, swagger_1.PickType)(sleep_session_dto_1.SleepSessionDto, ['sessionId']) {
}
exports.DeleteSleepSessionDto = DeleteSleepSessionDto;
//# sourceMappingURL=delete-sleep-session.dto.js.map