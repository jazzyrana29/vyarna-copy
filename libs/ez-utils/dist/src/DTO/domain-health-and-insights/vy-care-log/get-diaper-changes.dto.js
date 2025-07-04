"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDiaperChangesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const diaper_change_dto_1 = require("./diaper-change.dto");
class GetDiaperChangesDto extends (0, swagger_1.PickType)(diaper_change_dto_1.DiaperChangeDto, ['babyId']) {
}
exports.GetDiaperChangesDto = GetDiaperChangesDto;
//# sourceMappingURL=get-diaper-changes.dto.js.map