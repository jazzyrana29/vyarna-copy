"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGrowthMeasurementDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const growth_measurement_dto_1 = require("./growth-measurement.dto");
class CreateGrowthMeasurementDto extends (0, swagger_1.PickType)(growth_measurement_dto_1.GrowthMeasurementDto, [
    'babyId',
    'personId',
    'measurementType',
    'value',
    'unit',
    'timestamp',
    'notes',
]) {
}
exports.CreateGrowthMeasurementDto = CreateGrowthMeasurementDto;
//# sourceMappingURL=create-growth-measurement.dto.js.map