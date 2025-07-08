import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { StartNutritionSessionDto } from 'ez-utils';

@Injectable()
export class ValidateStartNutritionSessionDtoPipe implements PipeTransform {
  transform(value: StartNutritionSessionDto, _metadata: ArgumentMetadata) {
    const { milkGiverId, babyId, type } = value as any;
    if (!milkGiverId || !babyId || !type) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
