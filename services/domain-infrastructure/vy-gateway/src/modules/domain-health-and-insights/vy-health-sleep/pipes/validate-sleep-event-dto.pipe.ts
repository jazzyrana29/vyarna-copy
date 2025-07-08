import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { SleepEventDto } from 'ez-utils';

@Injectable()
export class ValidateSleepEventDtoPipe implements PipeTransform {
  transform(value: SleepEventDto, _metadata: ArgumentMetadata) {
    const { eventType, eventTime } = value as any;
    if (!eventType || !eventTime) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
