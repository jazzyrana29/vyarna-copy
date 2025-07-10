import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateNutritionSessionDto } from 'ez-utils';

@Injectable()
export class ValidateStartNutritionSessionDtoPipe implements PipeTransform {
  transform(value: CreateNutritionSessionDto, _metadata: ArgumentMetadata) {
    const { milkGiverId, babyId, type } = value as any;
    if (!milkGiverId || !babyId || !type) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
