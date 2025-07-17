import { PickType } from '@nestjs/swagger';
import { CartItemDto } from './cart-item.dto';

export class CreateCartItemDto extends PickType(CartItemDto, ['cartId', 'productId', 'quantity'] as const) {}
