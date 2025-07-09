import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetDevelopmentMomentsDto } from 'ez-utils';

@Injectable()
export class ValidateGetDevelopmentMomentsDtoPipe implements PipeTransform {
  transform(value: GetDevelopmentMomentsDto, _metadata: ArgumentMetadata) {
    if (!value.babyId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
