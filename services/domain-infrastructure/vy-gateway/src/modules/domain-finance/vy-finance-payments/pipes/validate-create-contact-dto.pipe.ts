import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateContactStripe } from 'ez-utils';

@Injectable()
export class ValidateCreateContactDtoPipe implements PipeTransform {
  transform(value: CreateContactStripe, _metadata: ArgumentMetadata) {
    const { firstName, lastName, email } = value as any;
    if (!firstName || !lastName || !email) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
