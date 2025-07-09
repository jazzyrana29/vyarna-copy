import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetMilestonesDto } from 'ez-utils';

@Injectable()
export class ValidateGetMilestonesDtoPipe implements PipeTransform {
  transform(value: GetMilestonesDto, _metadata: ArgumentMetadata) {
    if (!value.babyId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
