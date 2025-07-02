import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { LogoutOperatorSessionDto } from 'ez-utils';

@Injectable()
export class ValidateLogoutOperatorSessionDtoPipe implements PipeTransform {
  transform(value: LogoutOperatorSessionDto, metadata: ArgumentMetadata) {
    if (!value.operatorSessionId)
      throw new BadRequestException('Operator-session-id must be provided');

    return value;
  }
}
