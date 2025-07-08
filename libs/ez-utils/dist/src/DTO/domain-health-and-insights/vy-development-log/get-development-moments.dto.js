"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDevelopmentMomentsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const development_moment_dto_1 = require("./development-moment.dto");
class GetDevelopmentMomentsDto extends (0, swagger_1.PickType)(development_moment_dto_1.DevelopmentMomentDto, ['babyId']) {
}
exports.GetDevelopmentMomentsDto = GetDevelopmentMomentsDto;
//# sourceMappingURL=get-development-moments.dto.js.map