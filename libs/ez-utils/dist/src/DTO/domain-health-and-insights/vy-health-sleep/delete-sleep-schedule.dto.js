"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSleepScheduleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_schedule_dto_1 = require("./sleep-schedule.dto");
class DeleteSleepScheduleDto extends (0, swagger_1.PickType)(sleep_schedule_dto_1.SleepScheduleDto, ['scheduleId']) {
}
exports.DeleteSleepScheduleDto = DeleteSleepScheduleDto;
//# sourceMappingURL=delete-sleep-schedule.dto.js.map