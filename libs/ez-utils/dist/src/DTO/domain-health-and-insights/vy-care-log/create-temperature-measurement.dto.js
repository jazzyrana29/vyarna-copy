"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTemperatureMeasurementDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const temperature_measurement_dto_1 = require("./temperature-measurement.dto");
class CreateTemperatureMeasurementDto extends (0, swagger_1.PickType)(temperature_measurement_dto_1.TemperatureMeasurementDto, [
    'babyId',
    'personId',
    'temperature',
    'unit',
    'eventTime',
    'notes',
]) {
}
exports.CreateTemperatureMeasurementDto = CreateTemperatureMeasurementDto;
//# sourceMappingURL=create-temperature-measurement.dto.js.map