import { PickType } from '@nestjs/swagger';
import { DiaperChangeDto } from './diaper-change.dto';

export class CreateDiaperChangeDto extends PickType(DiaperChangeDto, [
  'babyId',
  'personId',
  'changeType',
  'timestamp',
  'notes',
] as const) {}
