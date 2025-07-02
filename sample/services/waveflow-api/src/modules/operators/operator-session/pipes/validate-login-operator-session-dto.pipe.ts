import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { LoginOperatorSessionDto } from 'ez-utils';

@Injectable()
export class ValidateLoginOperatorSessionDtoPipe implements PipeTransform {
  transform(value: LoginOperatorSessionDto, metadata: ArgumentMetadata) {
    if (!value.username || !value.password)
      throw new BadRequestException('Username and password must be provided');
    return value;
  }
}
