import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { SearchOperatorSessionsDto } from 'ez-utils';

@Injectable()
export class ValidateSearchOperatorSessionsDtoPipe implements PipeTransform {
  transform(value: SearchOperatorSessionsDto, metadata: ArgumentMetadata) {
    const { operatorId, startDate, endDate } = value;

    if (!operatorId && (!startDate || !endDate))
      throw new BadRequestException(
        'You must provide either operatorId or both startDate and endDate',
      );

    return value;
  }
}
