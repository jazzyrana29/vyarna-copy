import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { CreateDeviceSessionDto } from 'ez-utils';

@Injectable()
export class ValidateCreateDeviceSessionDtoPipe implements PipeTransform {
  transform(value: CreateDeviceSessionDto, metadata: ArgumentMetadata) {
    const { ...rest } = value;
    return {
      ...rest,
    };
  }
}
