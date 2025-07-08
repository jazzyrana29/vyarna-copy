import { PickType } from '@nestjs/swagger';
import { SleepScheduleDto } from './sleep-schedule.dto';

export class GetZtrackingSleepSchedulesDto extends PickType(SleepScheduleDto, ['babyId'] as const) {}
