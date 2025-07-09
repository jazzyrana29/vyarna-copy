import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { NutritionEventDto } from 'ez-utils';

@Injectable()
export class ValidateNutritionEventDtoPipe implements PipeTransform {
  transform(value: NutritionEventDto, _metadata: ArgumentMetadata) {
    const { eventType, sessionId } = value as any;
    if (!eventType || !sessionId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
