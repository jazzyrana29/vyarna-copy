import { PickType } from '@nestjs/swagger';
import { SleepScheduleDto } from './sleep-schedule.dto';

export class DeleteSleepScheduleDto extends PickType(SleepScheduleDto, ['scheduleId'] as const) {}
