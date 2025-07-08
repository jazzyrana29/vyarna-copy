import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateEmailDto } from 'ez-utils';

@Injectable()
export class ValidateCreateEmailDtoPipe implements PipeTransform {
  transform(value: CreateEmailDto, metadata: ArgumentMetadata) {
    const { personId, email } = value as any;
    if (!personId || !email) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
