import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { DeleteSessionDto } from 'ez-utils';

@Injectable()
export class ValidateDeleteSessionDtoPipe implements PipeTransform {
  transform(value: DeleteSessionDto, metadata: ArgumentMetadata) {
    if (!value.sessionId) {
      throw new BadRequestException('sessionId is required');
    }
    return value;
  }
}
