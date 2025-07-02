import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { GetListOfPermissionProfileDto } from 'ez-utils';

@Injectable()
export class ValidateGetListOfPermissionProfileDtoPipe
  implements PipeTransform
{
  transform(value: GetListOfPermissionProfileDto, metadata: ArgumentMetadata) {
    return value;
  }
}
