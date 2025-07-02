import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { GetBusinessUnitDto } from 'ez-utils';

@Injectable()
export class ValidateGetBusinessUnitDtoPipe implements PipeTransform {
  transform(value: GetBusinessUnitDto, metadata: ArgumentMetadata) {
    if (!value.businessUnitId && !value.name) {
      throw new BadRequestException('You must provide name or businessId');
    } else return value;
  }
}
