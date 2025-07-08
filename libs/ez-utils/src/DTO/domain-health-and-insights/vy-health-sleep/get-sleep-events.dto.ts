import { PickType } from '@nestjs/swagger';
import { SleepEventDto } from './sleep-event.dto';

export class GetSleepEventsDto extends PickType(SleepEventDto, ['sessionId'] as const) {}
