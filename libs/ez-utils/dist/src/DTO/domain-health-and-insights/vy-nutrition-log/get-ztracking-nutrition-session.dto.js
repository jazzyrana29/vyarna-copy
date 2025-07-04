"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingNutritionSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const nutrition_session_dto_1 = require("./nutrition-session.dto");
class GetZtrackingNutritionSessionDto extends (0, swagger_1.PickType)(nutrition_session_dto_1.NutritionSessionDto, ['sessionId']) {
}
exports.GetZtrackingNutritionSessionDto = GetZtrackingNutritionSessionDto;
//# sourceMappingURL=get-ztracking-nutrition-session.dto.js.map