import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { StartDeviceSessionDto } from 'ez-utils';

@Injectable()
export class ValidateStartDeviceSessionDtoPipe implements PipeTransform {
  transform(value: StartDeviceSessionDto, metadata: ArgumentMetadata) {
    const { deviceId, ipAddress, userAgent, name, startTime } = value;

    if (!deviceId) {
      throw new BadRequestException('You must provide deviceId');
    }

    return {
      deviceId,
      ...(ipAddress && { ipAddress }),
      ...(userAgent && { userAgent }),
      ...(name && { name }),
      ...(startTime && { startTime }),
    };
  }
}
