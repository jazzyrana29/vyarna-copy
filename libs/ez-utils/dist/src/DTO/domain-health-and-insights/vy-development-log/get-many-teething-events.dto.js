"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyTeethingEventsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const teething_event_dto_1 = require("./teething-event.dto");
class GetManyTeethingEventsDto extends (0, swagger_1.PickType)(teething_event_dto_1.TeethingEventDto, ['babyId']) {
}
exports.GetManyTeethingEventsDto = GetManyTeethingEventsDto;
//# sourceMappingURL=get-many-teething-events.dto.js.map