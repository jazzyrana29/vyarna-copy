import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { GetManySystemMechanismDto } from 'ez-utils';

@Injectable()
export class ValidateGetManySystemMechanismsDtoPipe implements PipeTransform {
  transform(value: GetManySystemMechanismDto, metadata: ArgumentMetadata) {
    return value;
  }
}
