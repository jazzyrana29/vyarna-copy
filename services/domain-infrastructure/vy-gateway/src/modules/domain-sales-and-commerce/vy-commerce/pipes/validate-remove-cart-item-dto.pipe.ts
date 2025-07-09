import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { RemoveCartItemDto } from 'ez-utils';

@Injectable()
export class ValidateRemoveCartItemDtoPipe implements PipeTransform {
  transform(value: RemoveCartItemDto, _metadata: ArgumentMetadata) {
    const { cartId, itemId } = value as any;
    if (!cartId || !itemId) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
