import { PickType } from '@nestjs/swagger';
import { SleepInterruptionReasonDto } from './sleep-interruption-reason.dto';

export class DeleteSleepInterruptionReasonDto extends PickType(SleepInterruptionReasonDto, ['reasonId'] as const) {}
