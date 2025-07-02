import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { GetHistoryOfBusinessUnitsDto } from 'ez-utils';

@Injectable()
export class ValidateGetBusinessUnitHistoryDtoPipe implements PipeTransform {
  transform(value: GetHistoryOfBusinessUnitsDto, metadata: ArgumentMetadata) {
    if (!value.businessUnitId) {
      throw new BadRequestException('You must provide businessUnitId');
    }
    return value;
  }
}
