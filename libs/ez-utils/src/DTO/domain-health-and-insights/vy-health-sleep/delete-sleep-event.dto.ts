import { PickType } from '@nestjs/swagger';
import { SleepEventDto } from './sleep-event.dto';

export class DeleteSleepEventDto extends PickType(SleepEventDto, ['eventId'] as const) {}
