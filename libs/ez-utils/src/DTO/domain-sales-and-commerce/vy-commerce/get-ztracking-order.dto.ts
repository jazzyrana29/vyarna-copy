import { PickType } from '@nestjs/swagger';
import { OrderDto } from './order.dto';

export class GetZtrackingOrderDto extends PickType(OrderDto, ['orderId'] as const) {}
