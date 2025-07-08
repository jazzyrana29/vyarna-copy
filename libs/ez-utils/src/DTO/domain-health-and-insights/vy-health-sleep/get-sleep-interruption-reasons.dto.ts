import { PickType } from '@nestjs/swagger';
import { SleepInterruptionReasonDto } from './sleep-interruption-reason.dto';

export class GetSleepInterruptionReasonsDto extends PickType(SleepInterruptionReasonDto, ['sessionId'] as const) {}
