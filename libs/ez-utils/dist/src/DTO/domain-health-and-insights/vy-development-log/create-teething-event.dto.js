"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeethingEventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const teething_event_dto_1 = require("./teething-event.dto");
class CreateTeethingEventDto extends (0, swagger_1.PickType)(teething_event_dto_1.TeethingEventDto, [
    'babyId',
    'personId',
    'toothName',
    'eruptionDate',
    'notes',
]) {
}
exports.CreateTeethingEventDto = CreateTeethingEventDto;
//# sourceMappingURL=create-teething-event.dto.js.map