import { PickType } from '@nestjs/swagger';
import { DevelopmentMomentDto } from './development-moment.dto';

export class GetDevelopmentMomentsDto extends PickType(DevelopmentMomentDto, ['babyId'] as const) {}
