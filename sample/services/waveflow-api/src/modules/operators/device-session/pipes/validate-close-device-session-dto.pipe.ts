import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { CloseDeviceSessionDto } from 'ez-utils';

@Injectable()
export class ValidateCloseDeviceSessionDtoPipe implements PipeTransform {
  transform(value: CloseDeviceSessionDto, metadata: ArgumentMetadata) {
    const { deviceSessionId, endTime, updatedBy } = value;

    if (!deviceSessionId) {
      throw new BadRequestException('You must provide deviceSessionId');
    }

    if (!endTime) {
      throw new BadRequestException('You must provide endTime');
    }

    if (!updatedBy) {
      throw new BadRequestException('You must provide updatedBy');
    }

    return {
      deviceSessionId,
      endTime,
      updatedBy,
    };
  }
}
