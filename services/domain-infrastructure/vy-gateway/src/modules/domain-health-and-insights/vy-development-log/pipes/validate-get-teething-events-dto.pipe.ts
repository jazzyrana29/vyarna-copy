import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetTeethingEventsDto } from 'ez-utils';

@Injectable()
export class ValidateGetTeethingEventsDtoPipe implements PipeTransform {
  transform(value: GetTeethingEventsDto, _metadata: ArgumentMetadata) {
    if (!value.babyId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
