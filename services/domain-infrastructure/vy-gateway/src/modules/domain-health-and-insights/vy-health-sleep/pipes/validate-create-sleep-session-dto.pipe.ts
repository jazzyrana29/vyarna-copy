import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateSleepSessionDto } from 'ez-utils';

@Injectable()
export class ValidateCreateSleepSessionDtoPipe implements PipeTransform {
  transform(value: CreateSleepSessionDto, _metadata: ArgumentMetadata) {
    const { babyId, start, end } = value as any;
    if (!babyId || !start || !end) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
