"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSleepInterruptionReasonsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_interruption_reason_dto_1 = require("./sleep-interruption-reason.dto");
class GetSleepInterruptionReasonsDto extends (0, swagger_1.PickType)(sleep_interruption_reason_dto_1.SleepInterruptionReasonDto, ['sessionId']) {
}
exports.GetSleepInterruptionReasonsDto = GetSleepInterruptionReasonsDto;
//# sourceMappingURL=get-sleep-interruption-reasons.dto.js.map