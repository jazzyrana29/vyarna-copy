import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { GetPermissionProfileForAnOperatorDto } from 'ez-utils';

@Injectable()
export class ValidateGetPermissionProfileForOperatorDtoPipe
  implements PipeTransform
{
  transform(value: GetPermissionProfileForAnOperatorDto) {
    if (!value.operatorId)
      throw new BadRequestException('You must provide operatorId');
    return value;
  }
}
