"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHistoryOfPersonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const person_dto_1 = require("./person.dto");
class GetHistoryOfPersonDto extends (0, swagger_1.PickType)(person_dto_1.PersonDto, ["personId"]) {
}
exports.GetHistoryOfPersonDto = GetHistoryOfPersonDto;
//# sourceMappingURL=get-history-of-person.dto.js.map