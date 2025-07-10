import { PickType } from '@nestjs/swagger';
import { CartItemDto } from './cart-item.dto';

export class DeleteCartItemDto extends PickType(CartItemDto, ['cartId', 'itemId'] as const) {}
