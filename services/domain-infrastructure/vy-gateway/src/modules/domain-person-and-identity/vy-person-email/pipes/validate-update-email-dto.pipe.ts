import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateEmailDto } from 'ez-utils';

@Injectable()
export class ValidateUpdateEmailDtoPipe implements PipeTransform {
  transform(value: UpdateEmailDto, metadata: ArgumentMetadata) {
    const { emailId } = value as any;
    if (!emailId) {
      throw new BadRequestException('emailId is required');
    }
    return value;
  }
}
