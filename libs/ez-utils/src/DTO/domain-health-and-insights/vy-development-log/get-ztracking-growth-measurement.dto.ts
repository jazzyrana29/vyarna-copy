import { PickType } from '@nestjs/swagger';
import { ZtrackingGrowthMeasurementDto } from './ztracking-growth-measurement.dto';

export class GetZtrackingGrowthMeasurementDto extends PickType(ZtrackingGrowthMeasurementDto, ['growthId'] as const) {}
