"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteWaveDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const wave_dto_1 = require("./wave.dto");
class DeleteWaveDto extends (0, swagger_1.PickType)(wave_dto_1.WaveDto, ["waveId"]) {
}
exports.DeleteWaveDto = DeleteWaveDto;
//# sourceMappingURL=delete-wave.dto.js.map