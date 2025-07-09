import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { SleepEventDto } from 'ez-utils';

@Injectable()
export class ValidateSleepEventDtoPipe implements PipeTransform {
  transform(value: SleepEventDto, _metadata: ArgumentMetadata) {
    const { sessionId, eventType, eventTime } = value as any;
    if (!sessionId || !eventType || !eventTime) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
