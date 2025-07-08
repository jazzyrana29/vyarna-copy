"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTeethingEventsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const teething_event_dto_1 = require("./teething-event.dto");
class GetTeethingEventsDto extends (0, swagger_1.PickType)(teething_event_dto_1.TeethingEventDto, ['babyId']) {
}
exports.GetTeethingEventsDto = GetTeethingEventsDto;
//# sourceMappingURL=get-teething-events.dto.js.map