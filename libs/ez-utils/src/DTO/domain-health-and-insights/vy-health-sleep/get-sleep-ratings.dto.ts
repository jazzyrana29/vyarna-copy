import { PickType } from '@nestjs/swagger';
import { SleepRatingDto } from './sleep-rating.dto';

export class GetSleepRatingsDto extends PickType(SleepRatingDto, ['sessionId'] as const) {}
