"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMilestonesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const milestone_dto_1 = require("./milestone.dto");
class GetMilestonesDto extends (0, swagger_1.PickType)(milestone_dto_1.MilestoneDto, ['babyId']) {
}
exports.GetMilestonesDto = GetMilestonesDto;
//# sourceMappingURL=get-milestones.dto.js.map