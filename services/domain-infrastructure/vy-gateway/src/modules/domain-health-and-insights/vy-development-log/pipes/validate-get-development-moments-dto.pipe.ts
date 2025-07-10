import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetManyDevelopmentMomentsDto } from 'ez-utils';

@Injectable()
export class ValidateGetDevelopmentMomentsDtoPipe implements PipeTransform {
  transform(value: GetManyDevelopmentMomentsDto, _metadata: ArgumentMetadata) {
    if (!value.babyId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
