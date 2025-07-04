"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNutritionSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const nutrition_session_dto_1 = require("./nutrition-session.dto");
class GetNutritionSessionDto extends (0, swagger_1.PickType)(nutrition_session_dto_1.NutritionSessionDto, ['sessionId']) {
}
exports.GetNutritionSessionDto = GetNutritionSessionDto;
//# sourceMappingURL=get-nutrition-session.dto.js.map