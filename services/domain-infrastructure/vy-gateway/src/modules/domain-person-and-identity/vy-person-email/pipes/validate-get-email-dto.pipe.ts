import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetEmailDto } from 'ez-utils';

@Injectable()
export class ValidateGetEmailDtoPipe implements PipeTransform {
  transform(value: GetEmailDto, metadata: ArgumentMetadata) {
    if (!value.emailId) {
      throw new BadRequestException('emailId is required');
    }
    return value;
  }
}
