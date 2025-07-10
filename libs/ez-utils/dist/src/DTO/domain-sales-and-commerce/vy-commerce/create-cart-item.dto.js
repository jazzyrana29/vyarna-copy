"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCartItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const cart_item_dto_1 = require("./cart-item.dto");
class CreateCartItemDto extends (0, swagger_1.PickType)(cart_item_dto_1.CartItemDto, ['cartId', 'variantId', 'quantity']) {
}
exports.CreateCartItemDto = CreateCartItemDto;
//# sourceMappingURL=create-cart-item.dto.js.map