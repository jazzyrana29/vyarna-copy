import { PickType } from '@nestjs/swagger';
import { SleepSummaryDto } from './sleep-summary.dto';

export class GetSleepSummaryDto extends PickType(SleepSummaryDto, ['sessionId'] as const) {}
