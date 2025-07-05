"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrdersDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const order_dto_1 = require("./order.dto");
class GetOrdersDto extends (0, swagger_1.PickType)(order_dto_1.OrderDto, ['personId']) {
}
exports.GetOrdersDto = GetOrdersDto;
//# sourceMappingURL=get-orders.dto.js.map