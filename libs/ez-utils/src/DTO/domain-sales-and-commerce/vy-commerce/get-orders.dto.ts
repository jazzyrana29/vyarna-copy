import { PickType } from '@nestjs/swagger';
import { OrderDto } from './order.dto';

export class GetOrdersDto extends PickType(OrderDto, ['personId'] as const) {}
