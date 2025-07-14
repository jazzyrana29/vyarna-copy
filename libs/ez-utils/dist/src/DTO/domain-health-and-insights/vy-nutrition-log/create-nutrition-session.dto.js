"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNutritionSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const nutrition_session_dto_1 = require("./nutrition-session.dto");
class CreateNutritionSessionDto extends (0, swagger_1.PickType)(nutrition_session_dto_1.NutritionSessionDto, [
    'milkGiverId',
    'babyId',
    'type',
]) {
}
exports.CreateNutritionSessionDto = CreateNutritionSessionDto;
//# sourceMappingURL=create-nutrition-session.dto.js.map