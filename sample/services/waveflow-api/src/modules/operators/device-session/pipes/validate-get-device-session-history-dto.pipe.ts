import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { GetDeviceSessionHistoryDto } from 'ez-utils';

@Injectable()
export class ValidateGetDeviceSessionHistoryDtoPipe implements PipeTransform {
  transform(value: GetDeviceSessionHistoryDto, metadata: ArgumentMetadata) {
    const { name, startTime, endTime } = value;

    // Ensure at least one filter is provided
    if (!name && !startTime && !endTime) {
      throw new BadRequestException(
        'You must provide at least one filter (name, startTime, or endTime)',
      );
    }

    // Validate startTime and endTime
    if (startTime && isNaN(Date.parse(startTime as any))) {
      throw new BadRequestException('Invalid startTime format');
    }
    if (endTime && isNaN(Date.parse(endTime as any))) {
      throw new BadRequestException('Invalid endTime format');
    }
    if (startTime && endTime && new Date(startTime) > new Date(endTime)) {
      throw new BadRequestException('startTime cannot be later than endTime');
    }

    return {
      ...(name && { name }),
      ...(startTime && { startTime }),
      ...(endTime && { endTime }),
    };
  }
}
