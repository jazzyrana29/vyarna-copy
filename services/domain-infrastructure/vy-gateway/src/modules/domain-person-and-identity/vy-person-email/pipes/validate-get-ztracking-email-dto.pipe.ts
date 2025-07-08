import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetZtrackingEmailDto } from 'ez-utils';

@Injectable()
export class ValidateGetZtrackingEmailDtoPipe implements PipeTransform {
  transform(value: GetZtrackingEmailDto, metadata: ArgumentMetadata) {
    if (!value.emailId) {
      throw new BadRequestException('emailId is required');
    }
    return value;
  }
}
