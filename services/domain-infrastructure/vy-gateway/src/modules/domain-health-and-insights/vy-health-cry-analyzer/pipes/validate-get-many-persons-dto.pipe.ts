import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { GetManyPersonsDto } from 'ez-utils';

@Injectable()
export class ValidateGetManyPersonsDtoPipe implements PipeTransform {
  transform(value: GetManyPersonsDto, metadata: ArgumentMetadata) {
    return value;
  }
}
