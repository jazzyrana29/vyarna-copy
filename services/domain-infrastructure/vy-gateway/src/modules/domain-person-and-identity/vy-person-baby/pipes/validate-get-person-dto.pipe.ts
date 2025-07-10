import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetOnePersonDto } from 'ez-utils';

@Injectable()
export class ValidateGetOnePersonDtoPipe implements PipeTransform {
  transform(value: GetOnePersonDto, metadata: ArgumentMetadata) {
    if (!value.operatorId && !value.nameFirst) {
      throw new BadRequestException('You must provide nameFirst or operatorId');
    }
    return value;
  }
}
