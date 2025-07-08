import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateTemperatureMeasurementDto } from 'ez-utils';

@Injectable()
export class ValidateCreateTemperatureMeasurementDtoPipe implements PipeTransform {
  transform(value: CreateTemperatureMeasurementDto, _metadata: ArgumentMetadata) {
    const { babyId, personId, temperature, unit, eventTime } = value as any;
    if (!babyId || !personId || temperature === undefined || !unit || !eventTime) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
