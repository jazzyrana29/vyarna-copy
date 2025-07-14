import { OrderDto } from './order.dto';
declare const CreateOrderDto_base: import("@nestjs/common").Type<Pick<OrderDto, "personId" | "status" | "paymentIntentId" | "currency" | "totalCents">>;
export declare class CreateOrderDto extends CreateOrderDto_base {
}
export {};
