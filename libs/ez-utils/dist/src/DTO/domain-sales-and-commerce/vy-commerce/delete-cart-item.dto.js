"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCartItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const cart_item_dto_1 = require("./cart-item.dto");
class DeleteCartItemDto extends (0, swagger_1.PickType)(cart_item_dto_1.CartItemDto, ['cartId', 'itemId']) {
}
exports.DeleteCartItemDto = DeleteCartItemDto;
//# sourceMappingURL=delete-cart-item.dto.js.map