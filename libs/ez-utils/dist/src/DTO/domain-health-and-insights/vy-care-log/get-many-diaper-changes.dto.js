"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyDiaperChangesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const diaper_change_dto_1 = require("./diaper-change.dto");
class GetManyDiaperChangesDto extends (0, swagger_1.PickType)(diaper_change_dto_1.DiaperChangeDto, ['babyId']) {
}
exports.GetManyDiaperChangesDto = GetManyDiaperChangesDto;
//# sourceMappingURL=get-many-diaper-changes.dto.js.map