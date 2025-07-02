import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { GetPermitsForPermissionProfileDto } from 'ez-utils';

@Injectable()
export class ValidateGetPermitsForPermissionProfileDtoPipe
  implements PipeTransform
{
  transform(
    value: GetPermitsForPermissionProfileDto,
    metadata: ArgumentMetadata,
  ) {
    if (!value.permissionProfileId)
      throw new BadRequestException('You must provide permissionProfileId');
    return value;
  }
}
