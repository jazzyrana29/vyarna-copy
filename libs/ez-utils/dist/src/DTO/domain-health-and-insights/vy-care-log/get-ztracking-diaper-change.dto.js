"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingDiaperChangeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const diaper_change_dto_1 = require("./diaper-change.dto");
class GetZtrackingDiaperChangeDto extends (0, swagger_1.PickType)(diaper_change_dto_1.DiaperChangeDto, [
    'diaperChangeId',
]) {
}
exports.GetZtrackingDiaperChangeDto = GetZtrackingDiaperChangeDto;
//# sourceMappingURL=get-ztracking-diaper-change.dto.js.map