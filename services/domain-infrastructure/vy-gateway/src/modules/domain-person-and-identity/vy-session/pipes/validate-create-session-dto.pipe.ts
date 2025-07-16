import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateSessionDto } from 'ez-utils';

@Injectable()
export class ValidateCreateSessionDtoPipe implements PipeTransform {
  transform(value: CreateSessionDto, metadata: ArgumentMetadata) {
    return value;
  }
}
