import { PickType } from '@nestjs/swagger';
import { MilestoneDto } from './milestone.dto';

export class GetManyMilestonesDto extends PickType(MilestoneDto, ['babyId'] as const) {}
