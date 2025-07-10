"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyDevelopmentMomentsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const development_moment_dto_1 = require("./development-moment.dto");
class GetManyDevelopmentMomentsDto extends (0, swagger_1.PickType)(development_moment_dto_1.DevelopmentMomentDto, ['babyId']) {
}
exports.GetManyDevelopmentMomentsDto = GetManyDevelopmentMomentsDto;
//# sourceMappingURL=get-many-development-moments.dto.js.map