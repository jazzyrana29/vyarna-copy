"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCartDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const cart_dto_1 = require("./cart.dto");
class CreateCartDto extends (0, swagger_1.PickType)(cart_dto_1.CartDto, ['personId']) {
}
exports.CreateCartDto = CreateCartDto;
//# sourceMappingURL=create-cart.dto.js.map