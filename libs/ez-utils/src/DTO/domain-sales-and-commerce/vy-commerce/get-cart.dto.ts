import { PickType } from '@nestjs/swagger';
import { CartDto } from './cart.dto';

export class GetCartDto extends PickType(CartDto, ['cartId'] as const) {}
