import { PickType } from '@nestjs/swagger';
import { GrowthMeasurementDto } from './growth-measurement.dto';

export class GetManyGrowthMeasurementsDto extends PickType(GrowthMeasurementDto, ['babyId'] as const) {}
