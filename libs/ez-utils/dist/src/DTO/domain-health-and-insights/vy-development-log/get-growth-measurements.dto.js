"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGrowthMeasurementsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const growth_measurement_dto_1 = require("./growth-measurement.dto");
class GetGrowthMeasurementsDto extends (0, swagger_1.PickType)(growth_measurement_dto_1.GrowthMeasurementDto, ['babyId']) {
}
exports.GetGrowthMeasurementsDto = GetGrowthMeasurementsDto;
//# sourceMappingURL=get-growth-measurements.dto.js.map