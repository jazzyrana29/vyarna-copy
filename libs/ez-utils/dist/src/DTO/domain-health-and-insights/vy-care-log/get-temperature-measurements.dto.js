"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTemperatureMeasurementsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const temperature_measurement_dto_1 = require("./temperature-measurement.dto");
class GetTemperatureMeasurementsDto extends (0, swagger_1.PickType)(temperature_measurement_dto_1.TemperatureMeasurementDto, ['babyId']) {
}
exports.GetTemperatureMeasurementsDto = GetTemperatureMeasurementsDto;
//# sourceMappingURL=get-temperature-measurements.dto.js.map