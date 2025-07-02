import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { RemovePermissionProfileForAnOperatorDto } from 'ez-utils';

@Injectable()
export class ValidateRemoveOperatorsForAPermissionProfileDtoPipe
  implements PipeTransform
{
  transform(value: RemovePermissionProfileForAnOperatorDto) {
    if (!value.permissionProfileId || !value.operatorId)
      throw new BadRequestException(
        'You must provide both permissionProfileId and operatorId',
      );
    return value;
  }
}
