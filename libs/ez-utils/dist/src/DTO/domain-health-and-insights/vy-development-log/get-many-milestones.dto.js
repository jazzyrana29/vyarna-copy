"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyMilestonesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const milestone_dto_1 = require("./milestone.dto");
class GetManyMilestonesDto extends (0, swagger_1.PickType)(milestone_dto_1.MilestoneDto, ['babyId']) {
}
exports.GetManyMilestonesDto = GetManyMilestonesDto;
//# sourceMappingURL=get-many-milestones.dto.js.map