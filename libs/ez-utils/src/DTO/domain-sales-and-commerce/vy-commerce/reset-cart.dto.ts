import { PickType } from '@nestjs/swagger';
import { CartDto } from './cart.dto';

export class ResetCartDto extends PickType(CartDto, ['cartId'] as const) {}
