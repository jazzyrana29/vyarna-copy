import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { CreatePermissionProfileForAnOperatorDto } from 'ez-utils';

@Injectable()
export class ValidateAddOperatorsForAPermissionProfileDtoPipe
  implements PipeTransform
{
  transform(value: CreatePermissionProfileForAnOperatorDto) {
    if (!value.permissionProfileId || !value.operatorId)
      throw new BadRequestException(
        'You must provide both permissionProfileId and operatorId',
      );
    return value;
  }
}
