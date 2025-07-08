import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateTeethingEventDto } from 'ez-utils';

@Injectable()
export class ValidateCreateTeethingEventDtoPipe implements PipeTransform {
  transform(value: CreateTeethingEventDto, _metadata: ArgumentMetadata) {
    const { babyId, personId, toothName, eruptionDate } = value as any;
    if (!babyId || !personId || !toothName || !eruptionDate) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
