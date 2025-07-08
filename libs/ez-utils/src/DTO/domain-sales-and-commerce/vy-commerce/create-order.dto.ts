import { PickType } from '@nestjs/swagger';
import { OrderDto } from './order.dto';

export class CreateOrderDto extends PickType(OrderDto, [
  'personId',
  'totalCents',
  'status',
  'currency',
  'paymentIntentId',
] as const) {}
