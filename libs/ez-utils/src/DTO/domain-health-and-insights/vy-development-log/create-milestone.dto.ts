import { PickType } from '@nestjs/swagger';
import { MilestoneDto } from './milestone.dto';

export class CreateMilestoneDto extends PickType(MilestoneDto, [
  'babyId',
  'personId',
  'milestoneType',
  'description',
  'achievedAt',
  'notes',
] as const) {}
