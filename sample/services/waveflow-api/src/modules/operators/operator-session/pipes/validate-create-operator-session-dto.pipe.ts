import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { CreateOperatorSessionDto } from 'ez-utils';

@Injectable()
export class ValidateCreateOperatorSessionDtoPipe implements PipeTransform {
  transform(value: CreateOperatorSessionDto, metadata: ArgumentMetadata) {
    const { ...rest } = value;
    return {
      ...rest,
    };
  }
}
