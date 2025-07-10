import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetManyTeethingEventsDto } from 'ez-utils';

@Injectable()
export class ValidateGetTeethingEventsDtoPipe implements PipeTransform {
  transform(value: GetManyTeethingEventsDto, _metadata: ArgumentMetadata) {
    if (!value.babyId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
