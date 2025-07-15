import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreatePersonDto } from 'ez-utils';

@Injectable()
export class ValidateCreatePersonDtoPipe implements PipeTransform {
  transform(value: CreatePersonDto, metadata: ArgumentMetadata) {
    const { businessUnitId, nameFirst, nameLast, email, password } =
      value as any;
    if (!businessUnitId || !nameFirst || !nameLast || !email || !password) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
