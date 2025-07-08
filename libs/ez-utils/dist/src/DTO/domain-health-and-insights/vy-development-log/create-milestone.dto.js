"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMilestoneDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const milestone_dto_1 = require("./milestone.dto");
class CreateMilestoneDto extends (0, swagger_1.PickType)(milestone_dto_1.MilestoneDto, [
    'babyId',
    'personId',
    'milestoneType',
    'description',
    'achievedAt',
    'notes',
]) {
}
exports.CreateMilestoneDto = CreateMilestoneDto;
//# sourceMappingURL=create-milestone.dto.js.map