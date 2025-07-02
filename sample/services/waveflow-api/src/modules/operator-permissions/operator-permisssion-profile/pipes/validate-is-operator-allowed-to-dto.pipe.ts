import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { IsOperatorAllowedToDto } from 'ez-utils';

@Injectable()
export class ValidateIsOperatorAllowedToDtoPipe implements PipeTransform {
  transform(value: IsOperatorAllowedToDto) {
    if (!value.permissionProfileId && !value.mechanismPermitId)
      throw new BadRequestException(
        'You must provide permissionProfileId and mechanismPermitId',
      );
    return value;
  }
}
