import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { DeleteCartItemDto } from 'ez-utils';

@Injectable()
export class ValidateRemoveCartItemDtoPipe implements PipeTransform {
  transform(value: DeleteCartItemDto, _metadata: ArgumentMetadata) {
    const { cartId, itemId } = value as any;
    if (!cartId || !itemId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
