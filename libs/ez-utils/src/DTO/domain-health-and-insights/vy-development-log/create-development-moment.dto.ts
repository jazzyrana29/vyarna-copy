import { PickType } from '@nestjs/swagger';
import { DevelopmentMomentDto } from './development-moment.dto';

export class CreateDevelopmentMomentDto extends PickType(DevelopmentMomentDto, [
  'babyId',
  'personId',
  'title',
  'description',
  'photoUrl',
  'timestamp',
  'notes',
] as const) {}
