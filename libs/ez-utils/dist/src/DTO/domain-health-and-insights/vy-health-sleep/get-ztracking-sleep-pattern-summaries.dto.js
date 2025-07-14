"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingSleepPatternSummariesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_pattern_summary_dto_1 = require("./sleep-pattern-summary.dto");
class GetZtrackingSleepPatternSummariesDto extends (0, swagger_1.PickType)(sleep_pattern_summary_dto_1.SleepPatternSummaryDto, ['babyId']) {
}
exports.GetZtrackingSleepPatternSummariesDto = GetZtrackingSleepPatternSummariesDto;
//# sourceMappingURL=get-ztracking-sleep-pattern-summaries.dto.js.map