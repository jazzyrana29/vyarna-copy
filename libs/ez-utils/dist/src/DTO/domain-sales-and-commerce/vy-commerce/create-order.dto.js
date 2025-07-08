"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const order_dto_1 = require("./order.dto");
class CreateOrderDto extends (0, swagger_1.PickType)(order_dto_1.OrderDto, [
    'personId',
    'totalCents',
    'status',
    'currency',
    'paymentIntentId',
]) {
}
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create-order.dto.js.map