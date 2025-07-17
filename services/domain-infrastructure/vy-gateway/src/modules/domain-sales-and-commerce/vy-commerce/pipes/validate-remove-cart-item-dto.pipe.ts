import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { DeleteCartItemDto } from 'ez-utils';

@Injectable()
export class ValidateRemoveCartItemDtoPipe implements PipeTransform {
  transform(value: DeleteCartItemDto, _metadata: ArgumentMetadata) {
    const { cartId, productId } = value as any;
    if (!cartId || !productId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
