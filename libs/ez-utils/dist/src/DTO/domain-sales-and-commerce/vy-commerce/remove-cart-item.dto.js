"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCartItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const cart_item_dto_1 = require("./cart-item.dto");
class RemoveCartItemDto extends (0, swagger_1.PickType)(cart_item_dto_1.CartItemDto, ['cartId', 'itemId']) {
}
exports.RemoveCartItemDto = RemoveCartItemDto;
//# sourceMappingURL=remove-cart-item.dto.js.map