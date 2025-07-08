import { PickType } from '@nestjs/swagger';
import { TeethingEventDto } from './teething-event.dto';

export class CreateTeethingEventDto extends PickType(TeethingEventDto, [
  'babyId',
  'personId',
  'toothName',
  'eruptionDate',
  'notes',
] as const) {}
