import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { GetDeviceSessionDto } from 'ez-utils';

@Injectable()
export class GetDeviceSessionValidation implements PipeTransform {
  transform(value: GetDeviceSessionDto, metadata: ArgumentMetadata) {
    if (!value.deviceSessionId && !value.name) {
      throw new BadRequestException(
        'You must provide deviceSessionId or deviceId',
      );
    } else return value;
  }
}
