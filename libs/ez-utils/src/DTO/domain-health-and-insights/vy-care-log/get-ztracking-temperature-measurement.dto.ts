import { PickType } from '@nestjs/swagger';
import { TemperatureMeasurementDto } from './temperature-measurement.dto';

export class GetZtrackingTemperatureMeasurementDto extends PickType(
  TemperatureMeasurementDto,
  ['tempId'] as const,
) {}
