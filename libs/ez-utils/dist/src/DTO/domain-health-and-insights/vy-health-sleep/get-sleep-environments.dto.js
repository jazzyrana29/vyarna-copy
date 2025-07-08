"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSleepEnvironmentsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_environment_dto_1 = require("./sleep-environment.dto");
class GetSleepEnvironmentsDto extends (0, swagger_1.PickType)(sleep_environment_dto_1.SleepEnvironmentDto, ['sessionId']) {
}
exports.GetSleepEnvironmentsDto = GetSleepEnvironmentsDto;
//# sourceMappingURL=get-sleep-environments.dto.js.map