"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSleepSummaryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_summary_dto_1 = require("./sleep-summary.dto");
class DeleteSleepSummaryDto extends (0, swagger_1.PickType)(sleep_summary_dto_1.SleepSummaryDto, ['sessionId']) {
}
exports.DeleteSleepSummaryDto = DeleteSleepSummaryDto;
//# sourceMappingURL=delete-sleep-summary.dto.js.map