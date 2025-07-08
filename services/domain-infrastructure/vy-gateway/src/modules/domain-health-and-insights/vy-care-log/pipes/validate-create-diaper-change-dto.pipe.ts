import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateDiaperChangeDto } from 'ez-utils';

@Injectable()
export class ValidateCreateDiaperChangeDtoPipe implements PipeTransform {
  transform(value: CreateDiaperChangeDto, _metadata: ArgumentMetadata) {
    const { babyId, personId, changeType, eventTime } = value as any;
    if (!babyId || !personId || !changeType || !eventTime) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
