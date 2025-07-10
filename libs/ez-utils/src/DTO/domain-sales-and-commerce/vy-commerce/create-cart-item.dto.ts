import { PickType } from '@nestjs/swagger';
import { CartItemDto } from './cart-item.dto';

export class CreateCartItemDto extends PickType(CartItemDto, ['cartId', 'variantId', 'quantity'] as const) {}
