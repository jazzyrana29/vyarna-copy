import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { GetMechanismPermitDto } from 'ez-utils';

@Injectable()
export class ValidateGetMechanismPermitDtoPipe implements PipeTransform {
  transform(value: GetMechanismPermitDto, metadata: ArgumentMetadata) {
    if (!value.mechanismPermitId && !value.name)
      throw new BadRequestException('You must provide name or permitId');
    return value;
  }
}
