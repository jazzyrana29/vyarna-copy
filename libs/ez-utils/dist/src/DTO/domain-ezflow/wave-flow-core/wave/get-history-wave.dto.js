"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHistoryWaveDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const wave_dto_1 = require("./wave.dto");
class GetHistoryWaveDto extends (0, swagger_1.PickType)(wave_dto_1.WaveDto, ["waveId"]) {
}
exports.GetHistoryWaveDto = GetHistoryWaveDto;
//# sourceMappingURL=get-history-wave.dto.js.map