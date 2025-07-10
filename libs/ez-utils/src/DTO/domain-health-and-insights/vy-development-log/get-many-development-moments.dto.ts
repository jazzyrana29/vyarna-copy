import { PickType } from '@nestjs/swagger';
import { DevelopmentMomentDto } from './development-moment.dto';

export class GetManyDevelopmentMomentsDto extends PickType(DevelopmentMomentDto, ['babyId'] as const) {}
