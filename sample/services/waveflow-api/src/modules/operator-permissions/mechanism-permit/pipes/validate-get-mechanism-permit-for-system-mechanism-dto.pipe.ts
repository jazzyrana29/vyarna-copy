import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { GetMechanismPermitForSystemMechanismDto } from 'ez-utils';

@Injectable()
export class ValidateGetMechanismPermitForSystemMechanismDtoPipe
  implements PipeTransform
{
  transform(
    value: GetMechanismPermitForSystemMechanismDto,
    metadata: ArgumentMetadata,
  ) {
    if (!value.systemMechanismId)
      throw new BadRequestException(
        'systemMechanismId must be a string or null',
      );
    return value;
  }
}
