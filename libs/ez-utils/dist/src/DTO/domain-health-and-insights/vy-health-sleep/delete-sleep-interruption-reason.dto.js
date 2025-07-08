"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSleepInterruptionReasonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_interruption_reason_dto_1 = require("./sleep-interruption-reason.dto");
class DeleteSleepInterruptionReasonDto extends (0, swagger_1.PickType)(sleep_interruption_reason_dto_1.SleepInterruptionReasonDto, ['reasonId']) {
}
exports.DeleteSleepInterruptionReasonDto = DeleteSleepInterruptionReasonDto;
//# sourceMappingURL=delete-sleep-interruption-reason.dto.js.map