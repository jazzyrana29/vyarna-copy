import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetHistoryOfPersonDto } from 'ez-utils';

@Injectable()
export class ValidateGetHistoryPersonDtoPipe implements PipeTransform {
  transform(value: GetHistoryOfPersonDto, metadata: ArgumentMetadata) {
    if (!value.personId) {
      throw new BadRequestException('You must provide personId');
    }
    return value;
  }
}
