"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingSleepSchedulesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_schedule_dto_1 = require("./sleep-schedule.dto");
class GetZtrackingSleepSchedulesDto extends (0, swagger_1.PickType)(sleep_schedule_dto_1.SleepScheduleDto, ['babyId']) {}
exports.GetZtrackingSleepSchedulesDto = GetZtrackingSleepSchedulesDto;
//# sourceMappingURL=get-ztracking-sleep-schedules.dto.js.map
