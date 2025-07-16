import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateSessionDto } from 'ez-utils';

@Injectable()
export class ValidateUpdateSessionDtoPipe implements PipeTransform {
  transform(value: UpdateSessionDto, metadata: ArgumentMetadata) {
    if (!value.sessionId) {
      throw new BadRequestException('sessionId is required');
    }
    return value;
  }
}
