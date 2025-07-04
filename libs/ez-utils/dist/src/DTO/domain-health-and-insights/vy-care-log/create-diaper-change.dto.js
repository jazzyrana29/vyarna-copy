"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDiaperChangeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const diaper_change_dto_1 = require("./diaper-change.dto");
class CreateDiaperChangeDto extends (0, swagger_1.PickType)(diaper_change_dto_1.DiaperChangeDto, [
    'babyId',
    'personId',
    'changeType',
    'timestamp',
    'notes',
]) {
}
exports.CreateDiaperChangeDto = CreateDiaperChangeDto;
//# sourceMappingURL=create-diaper-change.dto.js.map