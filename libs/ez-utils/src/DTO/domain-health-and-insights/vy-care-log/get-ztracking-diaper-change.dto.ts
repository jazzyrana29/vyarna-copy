import { PickType } from '@nestjs/swagger';
import { DiaperChangeDto } from './diaper-change.dto';

export class GetZtrackingDiaperChangeDto extends PickType(DiaperChangeDto, [
  'diaperChangeId',
] as const) {}
