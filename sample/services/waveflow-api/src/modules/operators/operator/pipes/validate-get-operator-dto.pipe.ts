import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { GetOperatorDto } from 'ez-utils';

@Injectable()
export class ValidateGetOperatorDtoPipe implements PipeTransform {
  transform(value: GetOperatorDto, metadata: ArgumentMetadata) {
    if (!value.operatorId && !value.nameFirst) {
      throw new BadRequestException('You must provide nameFirst or operatorId');
    } else return value;
  }
}
