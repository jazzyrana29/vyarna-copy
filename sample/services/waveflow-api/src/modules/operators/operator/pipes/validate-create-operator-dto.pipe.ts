import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateOperatorDto } from 'ez-utils';

@Injectable()
export class ValidateCreateOperatorDtoPipe implements PipeTransform {
  transform(value: CreateOperatorDto, metadata: ArgumentMetadata) {
    return value;
  }
}
