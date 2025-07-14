"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSleepSummaryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_summary_dto_1 = require("./sleep-summary.dto");
class GetSleepSummaryDto extends (0, swagger_1.PickType)(sleep_summary_dto_1.SleepSummaryDto, ['sessionId']) {
}
exports.GetSleepSummaryDto = GetSleepSummaryDto;
//# sourceMappingURL=get-sleep-summary.dto.js.map