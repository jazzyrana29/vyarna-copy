"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSleepPatternSummariesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_pattern_summary_dto_1 = require("./sleep-pattern-summary.dto");
class GetSleepPatternSummariesDto extends (0, swagger_1.PickType)(sleep_pattern_summary_dto_1.SleepPatternSummaryDto, ['babyId']) {
}
exports.GetSleepPatternSummariesDto = GetSleepPatternSummariesDto;
//# sourceMappingURL=get-sleep-pattern-summaries.dto.js.map