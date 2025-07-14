"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneNutritionSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const nutrition_session_dto_1 = require("./nutrition-session.dto");
class GetOneNutritionSessionDto extends (0, swagger_1.PickType)(nutrition_session_dto_1.NutritionSessionDto, ['sessionId']) {
}
exports.GetOneNutritionSessionDto = GetOneNutritionSessionDto;
//# sourceMappingURL=get-one-nutrition-session.dto.js.map