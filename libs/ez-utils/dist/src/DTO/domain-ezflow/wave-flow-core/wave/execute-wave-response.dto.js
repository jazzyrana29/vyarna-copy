"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteWaveResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const wave_dto_1 = require("./wave.dto");
class ExecuteWaveResponseDto extends (0, swagger_1.PickType)(wave_dto_1.WaveDto, [
    "waveId",
    "waveStatus",
    "returnVariables",
]) {
}
exports.ExecuteWaveResponseDto = ExecuteWaveResponseDto;
//# sourceMappingURL=execute-wave-response.dto.js.map