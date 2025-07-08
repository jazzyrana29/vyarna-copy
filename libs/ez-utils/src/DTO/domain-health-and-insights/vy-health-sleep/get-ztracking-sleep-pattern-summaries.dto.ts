import { PickType } from '@nestjs/swagger';
import { SleepPatternSummaryDto } from './sleep-pattern-summary.dto';

export class GetZtrackingSleepPatternSummariesDto extends PickType(SleepPatternSummaryDto, ['babyId'] as const) {}
