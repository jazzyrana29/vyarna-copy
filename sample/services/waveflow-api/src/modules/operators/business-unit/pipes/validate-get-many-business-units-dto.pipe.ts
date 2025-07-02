import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { GetManyBusinessUnitsDto } from 'ez-utils';

@Injectable()
export class ValidateGetManyBusinessUnitsDtoPipe implements PipeTransform {
  transform(value: GetManyBusinessUnitsDto, metadata: ArgumentMetadata) {
    return value;
  }
}
