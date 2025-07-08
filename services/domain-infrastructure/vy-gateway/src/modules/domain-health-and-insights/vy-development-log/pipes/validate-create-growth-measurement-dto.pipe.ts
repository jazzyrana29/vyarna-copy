import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateGrowthMeasurementDto } from 'ez-utils';

@Injectable()
export class ValidateCreateGrowthMeasurementDtoPipe implements PipeTransform {
  transform(value: CreateGrowthMeasurementDto, _metadata: ArgumentMetadata) {
    const { babyId, personId, measurementType, value: val, unit, timestamp } = value as any;
    if (!babyId || !personId || !measurementType || val === undefined || !unit || !timestamp) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
