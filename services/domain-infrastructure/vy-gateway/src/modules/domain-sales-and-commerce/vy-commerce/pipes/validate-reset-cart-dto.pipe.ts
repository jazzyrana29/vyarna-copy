import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ResetCartDto } from 'ez-utils';

@Injectable()
export class ValidateResetCartDtoPipe implements PipeTransform {
  transform(value: ResetCartDto, _metadata: ArgumentMetadata) {
    const { cartId } = value as any;
    if (!cartId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
