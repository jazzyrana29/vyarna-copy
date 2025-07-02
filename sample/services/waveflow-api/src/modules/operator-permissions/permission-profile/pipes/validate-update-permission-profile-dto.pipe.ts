import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { UpdatePermissionProfileDto } from 'ez-utils';

@Injectable()
export class ValidateUpdatePermissionProfileDtoPipe implements PipeTransform {
  transform(value: UpdatePermissionProfileDto, metadata: ArgumentMetadata) {
    const { businessUnitId, ...rest } = value;
    return {
      ...rest,
      ...(businessUnitId && { businessUnitId }),
    };
  }
}
