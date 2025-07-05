import { OrderDto } from './order.dto';
declare const CreateOrderDto_base: import("@nestjs/common").Type<Pick<OrderDto, "personId" | "status" | "totalCents">>;
export declare class CreateOrderDto extends CreateOrderDto_base {
}
export {};
