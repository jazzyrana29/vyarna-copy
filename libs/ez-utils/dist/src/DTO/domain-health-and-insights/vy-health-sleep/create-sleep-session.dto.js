"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSleepSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_session_dto_1 = require("./sleep-session.dto");
class CreateSleepSessionDto extends (0, swagger_1.PickType)(sleep_session_dto_1.SleepSessionDto, [
    'babyId',
    'start',
    'end',
]) {
}
exports.CreateSleepSessionDto = CreateSleepSessionDto;
//# sourceMappingURL=create-sleep-session.dto.js.map