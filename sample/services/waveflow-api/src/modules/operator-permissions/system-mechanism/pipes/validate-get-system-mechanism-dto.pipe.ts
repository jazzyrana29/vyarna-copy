import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { GetSystemMechanismDto } from 'ez-utils';

@Injectable()
export class ValidateGetSystemMechanismDtoPipe implements PipeTransform {
  transform(value: GetSystemMechanismDto, metadata: ArgumentMetadata) {
    if (!value.systemMechanismId && !value.name)
      throw new BadRequestException(
        'You must provide name or systemMechanismId',
      );
    return value;
  }
}
