import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { GetPermissionProfileDto } from 'ez-utils';

@Injectable()
export class ValidateGetPermissionProfileDtoPipe implements PipeTransform {
  transform(value: GetPermissionProfileDto, metadata: ArgumentMetadata) {
    if (!value.permissionProfileId && !value.name)
      throw new BadRequestException(
        'You must provide name or permissionProfileId',
      );
    return value;
  }
}
