import { PickType } from '@nestjs/swagger';
import { SleepSessionDto } from './sleep-session.dto';

export class GetZtrackingSleepSessionDto extends PickType(SleepSessionDto, ['sessionId'] as const) {}
