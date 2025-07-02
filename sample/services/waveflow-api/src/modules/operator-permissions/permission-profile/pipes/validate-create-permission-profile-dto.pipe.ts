import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { CreatePermissionProfileDto } from 'ez-utils';

@Injectable()
export class ValidateCreatePermissionProfileDtoPipe implements PipeTransform {
  transform(value: CreatePermissionProfileDto, metadata: ArgumentMetadata) {
    const { businessUnitId, ...rest } = value;
    return {
      ...rest,
      ...(businessUnitId && { businessUnitId }),
    };
  }
}
