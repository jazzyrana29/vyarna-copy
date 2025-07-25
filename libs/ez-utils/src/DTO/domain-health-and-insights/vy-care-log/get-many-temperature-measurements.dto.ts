import { PickType } from '@nestjs/swagger';
import { TemperatureMeasurementDto } from './temperature-measurement.dto';

export class GetManyTemperatureMeasurementsDto extends PickType(TemperatureMeasurementDto, ['babyId'] as const) {}
