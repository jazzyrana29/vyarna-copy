import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetManyGrowthMeasurementsDto } from 'ez-utils';

@Injectable()
export class ValidateGetGrowthMeasurementsDtoPipe implements PipeTransform {
  transform(value: GetManyGrowthMeasurementsDto, _metadata: ArgumentMetadata) {
    if (!value.babyId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
