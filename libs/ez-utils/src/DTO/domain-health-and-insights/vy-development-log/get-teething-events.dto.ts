import { PickType } from '@nestjs/swagger';
import { TeethingEventDto } from './teething-event.dto';

export class GetTeethingEventsDto extends PickType(TeethingEventDto, ['babyId'] as const) {}
