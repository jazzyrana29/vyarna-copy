import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateCartDto } from 'ez-utils';

@Injectable()
export class ValidateCreateCartDtoPipe implements PipeTransform {
  transform(value: CreateCartDto, _metadata: ArgumentMetadata) {
    if (!(value as any).sessionId) {
      throw new BadRequestException('sessionId is required');
    }
    return value;
  }
}
