import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetGrowthMeasurementsDto } from 'ez-utils';

@Injectable()
export class ValidateGetGrowthMeasurementsDtoPipe implements PipeTransform {
  transform(value: GetGrowthMeasurementsDto, _metadata: ArgumentMetadata) {
    if (!value.babyId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
