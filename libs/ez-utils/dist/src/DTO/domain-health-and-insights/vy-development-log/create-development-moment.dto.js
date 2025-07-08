"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDevelopmentMomentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const development_moment_dto_1 = require("./development-moment.dto");
class CreateDevelopmentMomentDto extends (0, swagger_1.PickType)(development_moment_dto_1.DevelopmentMomentDto, [
    'babyId',
    'personId',
    'title',
    'description',
    'photoUrl',
    'timestamp',
    'notes',
]) {
}
exports.CreateDevelopmentMomentDto = CreateDevelopmentMomentDto;
//# sourceMappingURL=create-development-moment.dto.js.map