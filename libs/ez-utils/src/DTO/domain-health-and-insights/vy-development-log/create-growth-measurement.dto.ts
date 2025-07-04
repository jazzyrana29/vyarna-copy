import { PickType } from '@nestjs/swagger';
import { GrowthMeasurementDto } from './growth-measurement.dto';

export class CreateGrowthMeasurementDto extends PickType(GrowthMeasurementDto, [
  'babyId',
  'personId',
  'measurementType',
  'value',
  'unit',
  'timestamp',
  'notes',
] as const) {}
