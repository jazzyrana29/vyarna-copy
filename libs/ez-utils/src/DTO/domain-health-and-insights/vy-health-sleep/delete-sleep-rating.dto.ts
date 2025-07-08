import { PickType } from '@nestjs/swagger';
import { SleepRatingDto } from './sleep-rating.dto';

export class DeleteSleepRatingDto extends PickType(SleepRatingDto, ['ratingId'] as const) {}
