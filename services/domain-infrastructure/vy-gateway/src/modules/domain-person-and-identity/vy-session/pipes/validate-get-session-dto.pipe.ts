import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetOneSessionDto } from 'ez-utils';

@Injectable()
export class ValidateGetSessionDtoPipe implements PipeTransform {
  transform(value: GetOneSessionDto, metadata: ArgumentMetadata) {
    if (!value.sessionId) {
      throw new BadRequestException('sessionId is required');
    }
    return value;
  }
}
