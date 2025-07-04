import { PickType } from '@nestjs/swagger';
import { SleepSessionDto } from './sleep-session.dto';

export class CreateSleepSessionDto extends PickType(SleepSessionDto, [
  'babyId',
  'start',
  'end',
] as const) {}
