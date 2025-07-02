import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { GetManyOperatorsDto } from 'ez-utils';

@Injectable()
export class ValidateGetManyOperatorsDtoPipe implements PipeTransform {
  transform(value: GetManyOperatorsDto, metadata: ArgumentMetadata) {
    return value;
  }
}
