import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetOneEmailDto } from 'ez-utils';

@Injectable()
export class ValidateGetOneEmailDtoPipe implements PipeTransform {
  transform(value: GetOneEmailDto, metadata: ArgumentMetadata) {
    if (!value.emailId) {
      throw new BadRequestException('emailId is required');
    }
    return value;
  }
}
