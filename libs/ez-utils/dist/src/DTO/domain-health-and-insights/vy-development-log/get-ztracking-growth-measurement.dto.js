"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingGrowthMeasurementDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const ztracking_growth_measurement_dto_1 = require("./ztracking-growth-measurement.dto");
class GetZtrackingGrowthMeasurementDto extends (0, swagger_1.PickType)(ztracking_growth_measurement_dto_1.ZtrackingGrowthMeasurementDto, ['growthId']) {
}
exports.GetZtrackingGrowthMeasurementDto = GetZtrackingGrowthMeasurementDto;
//# sourceMappingURL=get-ztracking-growth-measurement.dto.js.map