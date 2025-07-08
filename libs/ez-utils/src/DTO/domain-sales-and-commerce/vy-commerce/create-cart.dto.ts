import { PickType } from '@nestjs/swagger';
import { CartDto } from './cart.dto';

export class CreateCartDto extends PickType(CartDto, ['personId'] as const) {}
