import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { GetPermissionProfileManagedThroughMechanismPermitDto } from 'ez-utils';

@Injectable()
export class ValidateGetPermissionProfileManagedThroughMechanismPermitDtoPipe
  implements PipeTransform
{
  transform(
    value: GetPermissionProfileManagedThroughMechanismPermitDto,
    metadata: ArgumentMetadata,
  ) {
    if (!value.mechanismPermitId && !value.permissionProfileId) {
      throw new BadRequestException(
        'You must provide mechanismPermitId or permissionProfileId',
      );
    }
    return value;
  }
}
