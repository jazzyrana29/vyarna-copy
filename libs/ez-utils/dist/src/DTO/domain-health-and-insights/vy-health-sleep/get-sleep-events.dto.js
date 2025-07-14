"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSleepEventsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_event_dto_1 = require("./sleep-event.dto");
class GetSleepEventsDto extends (0, swagger_1.PickType)(sleep_event_dto_1.SleepEventDto, ['sessionId']) {
}
exports.GetSleepEventsDto = GetSleepEventsDto;
//# sourceMappingURL=get-sleep-events.dto.js.map