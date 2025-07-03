import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UpdatePersonDto } from 'ez-utils';

@Injectable()
export class ValidateUpdatePersonDtoPipe implements PipeTransform {
  transform(value: UpdatePersonDto, metadata: ArgumentMetadata) {
    if (!value.operatorId) {
      throw new BadRequestException('You must provide operatorId');
    }
    return value;
  }
}
