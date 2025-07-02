import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { GetOperatorsForPermissionProfileDto } from 'ez-utils';

@Injectable()
export class ValidateGetOperatorsForPermissionProfileDtoPipe
  implements PipeTransform
{
  transform(value: GetOperatorsForPermissionProfileDto) {
    if (!value.permissionProfileId)
      throw new BadRequestException('You must provide permissionProfileId');
    return value;
  }
}
