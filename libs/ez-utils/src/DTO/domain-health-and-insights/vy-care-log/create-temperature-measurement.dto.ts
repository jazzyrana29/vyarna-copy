import { PickType } from '@nestjs/swagger';
import { TemperatureMeasurementDto } from './temperature-measurement.dto';

export class CreateTemperatureMeasurementDto extends PickType(TemperatureMeasurementDto, [
  'babyId',
  'personId',
  'temperature',
  'unit',
  'eventTime',
  'notes',
] as const) {}
