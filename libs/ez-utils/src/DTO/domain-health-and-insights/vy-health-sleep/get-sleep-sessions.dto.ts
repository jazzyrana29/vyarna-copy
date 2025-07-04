import { PickType } from '@nestjs/swagger';
import { SleepSessionDto } from './sleep-session.dto';

export class GetSleepSessionsDto extends PickType(SleepSessionDto, ['babyId'] as const) {}
