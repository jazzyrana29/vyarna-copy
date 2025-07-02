import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetPersonDto } from 'ez-utils';

@Injectable()
export class ValidateGetPersonDtoPipe implements PipeTransform {
  transform(value: GetPersonDto, metadata: ArgumentMetadata) {
    if (!value.operatorId && !value.nameFirst) {
      throw new BadRequestException('You must provide nameFirst or operatorId');
    }
    return value;
  }
}
