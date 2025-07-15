import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { GetZtrackingGrowthMeasurementDto } from 'ez-utils';

@Injectable()
export class ValidateGetZtrackingGrowthMeasurementDtoPipe
  implements PipeTransform
{
  transform(
    value: GetZtrackingGrowthMeasurementDto,
    _metadata: ArgumentMetadata,
  ) {
    if (!value.growthId) {
      throw new BadRequestException('growthId is required');
    }
    return value;
  }
}
