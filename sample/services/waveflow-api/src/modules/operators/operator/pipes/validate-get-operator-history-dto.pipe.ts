import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { GetHistoryOfOperatorDto } from 'ez-utils';

@Injectable()
export class ValidateGetOperatorHistoryDtoPipe implements PipeTransform {
  transform(value: GetHistoryOfOperatorDto, metadata: ArgumentMetadata) {
    if (!value.operatorId) {
      throw new BadRequestException('You must provide operatorId');
    }
    return value;
  }
}
