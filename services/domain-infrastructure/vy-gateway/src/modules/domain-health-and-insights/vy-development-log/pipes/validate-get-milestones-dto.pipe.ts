import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetManyMilestonesDto } from 'ez-utils';

@Injectable()
export class ValidateGetMilestonesDtoPipe implements PipeTransform {
  transform(value: GetManyMilestonesDto, _metadata: ArgumentMetadata) {
    if (!value.babyId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
