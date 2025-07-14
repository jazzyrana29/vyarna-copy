"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSleepEnvironmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_environment_dto_1 = require("./sleep-environment.dto");
class DeleteSleepEnvironmentDto extends (0, swagger_1.PickType)(sleep_environment_dto_1.SleepEnvironmentDto, ['envId']) {
}
exports.DeleteSleepEnvironmentDto = DeleteSleepEnvironmentDto;
//# sourceMappingURL=delete-sleep-environment.dto.js.map