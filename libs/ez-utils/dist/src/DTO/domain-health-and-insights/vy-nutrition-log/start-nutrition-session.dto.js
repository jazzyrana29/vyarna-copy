"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartNutritionSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const nutrition_session_dto_1 = require("./nutrition-session.dto");
class StartNutritionSessionDto extends (0, swagger_1.PickType)(nutrition_session_dto_1.NutritionSessionDto, [
    'milkGiverId',
    'babyId',
    'type',
]) {
}
exports.StartNutritionSessionDto = StartNutritionSessionDto;
//# sourceMappingURL=start-nutrition-session.dto.js.map