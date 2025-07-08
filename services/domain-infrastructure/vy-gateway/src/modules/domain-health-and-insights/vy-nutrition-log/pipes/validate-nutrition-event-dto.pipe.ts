import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { NutritionEventDto } from '../dto/nutrition-event.dto';

@Injectable()
export class ValidateNutritionEventDtoPipe implements PipeTransform {
  transform(value: NutritionEventDto, _metadata: ArgumentMetadata) {
    const { eventType } = value as any;
    if (!eventType) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
