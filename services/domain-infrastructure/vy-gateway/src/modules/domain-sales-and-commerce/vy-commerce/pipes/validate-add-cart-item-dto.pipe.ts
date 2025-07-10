import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateCartItemDto } from 'ez-utils';

@Injectable()
export class ValidateAddCartItemDtoPipe implements PipeTransform {
  transform(value: CreateCartItemDto, _metadata: ArgumentMetadata) {
    const { cartId, variantId, quantity } = value as any;
    if (!cartId || !variantId || !quantity) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
