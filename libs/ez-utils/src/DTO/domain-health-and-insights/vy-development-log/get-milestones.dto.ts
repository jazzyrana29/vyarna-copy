import { PickType } from '@nestjs/swagger';
import { MilestoneDto } from './milestone.dto';

export class GetMilestonesDto extends PickType(MilestoneDto, ['babyId'] as const) {}
