import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreatePersonDto } from 'ez-utils';

@Injectable()
export class ValidateCreatePersonDtoPipe implements PipeTransform {
  transform(value: CreatePersonDto, metadata: ArgumentMetadata) {
    const { rootBusinessUnitId, nameFirst, nameLastFirst, nameLastSecond, email, password } = value as any;
    if (!rootBusinessUnitId || !nameFirst || !nameLastFirst || !email || !password) {
      throw new BadRequestException('Missing required fields: rootBusinessUnitId, nameFirst, nameLastFirst, email, password');
    }
    return value;
  }
}
