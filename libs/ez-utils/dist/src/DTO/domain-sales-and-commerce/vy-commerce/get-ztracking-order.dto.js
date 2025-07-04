"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const order_dto_1 = require("./order.dto");
class GetZtrackingOrderDto extends (0, swagger_1.PickType)(order_dto_1.OrderDto, ['orderId']) {
}
exports.GetZtrackingOrderDto = GetZtrackingOrderDto;
//# sourceMappingURL=get-ztracking-order.dto.js.map