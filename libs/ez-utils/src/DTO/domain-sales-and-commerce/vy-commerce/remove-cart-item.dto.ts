import { PickType } from '@nestjs/swagger';
import { CartItemDto } from './cart-item.dto';

export class RemoveCartItemDto extends PickType(CartItemDto, ['cartId', 'itemId'] as const) {}
