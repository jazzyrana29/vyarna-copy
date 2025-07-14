"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyTemperatureMeasurementsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const temperature_measurement_dto_1 = require("./temperature-measurement.dto");
class GetManyTemperatureMeasurementsDto extends (0, swagger_1.PickType)(temperature_measurement_dto_1.TemperatureMeasurementDto, ['babyId']) {
}
exports.GetManyTemperatureMeasurementsDto = GetManyTemperatureMeasurementsDto;
//# sourceMappingURL=get-many-temperature-measurements.dto.js.map