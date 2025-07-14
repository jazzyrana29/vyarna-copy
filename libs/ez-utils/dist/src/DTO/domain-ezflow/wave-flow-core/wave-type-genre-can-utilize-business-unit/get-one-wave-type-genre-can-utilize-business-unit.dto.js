"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneWaveTypeGenreCanUtilizeBusinessUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const wave_type_genre_can_utilize_business_unit_dto_1 = require("../wave-type-genre-can-utilize-business-unit/wave-type-genre-can-utilize-business-unit.dto");
class GetOneWaveTypeGenreCanUtilizeBusinessUnitDto extends (0, swagger_1.PickType)(wave_type_genre_can_utilize_business_unit_dto_1.WaveTypeGenreCanUtilizeBusinessUnitDto, ["waveTypeGenreId", "businessUnitId", "isDeleted"]) {
}
exports.GetOneWaveTypeGenreCanUtilizeBusinessUnitDto = GetOneWaveTypeGenreCanUtilizeBusinessUnitDto;
//# sourceMappingURL=get-one-wave-type-genre-can-utilize-business-unit.dto.js.map