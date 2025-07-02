import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { GetOperatorSessionDto } from 'ez-utils';

@Injectable()
export class GetOperatorSessionValidation implements PipeTransform {
  transform(value: GetOperatorSessionDto, metadata: ArgumentMetadata) {
    if (!value.operatorSessionId)
      throw new BadRequestException(
        'You must provide name or operatorSessionId',
      );
    return value;
  }
}
