import { PickType } from '@nestjs/swagger';
import { SleepPatternSummaryDto } from './sleep-pattern-summary.dto';

export class GetSleepPatternSummariesDto extends PickType(SleepPatternSummaryDto, ['babyId'] as const) {}
