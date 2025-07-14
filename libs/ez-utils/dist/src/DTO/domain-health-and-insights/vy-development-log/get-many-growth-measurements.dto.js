"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyGrowthMeasurementsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const growth_measurement_dto_1 = require("./growth-measurement.dto");
class GetManyGrowthMeasurementsDto extends (0, swagger_1.PickType)(growth_measurement_dto_1.GrowthMeasurementDto, ['babyId']) {
}
exports.GetManyGrowthMeasurementsDto = GetManyGrowthMeasurementsDto;
//# sourceMappingURL=get-many-growth-measurements.dto.js.map