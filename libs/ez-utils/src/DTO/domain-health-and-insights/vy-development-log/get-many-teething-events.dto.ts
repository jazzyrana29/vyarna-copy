import { PickType } from '@nestjs/swagger';
import { TeethingEventDto } from './teething-event.dto';

export class GetManyTeethingEventsDto extends PickType(TeethingEventDto, ['babyId'] as const) {}
