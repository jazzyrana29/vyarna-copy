"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaymentMethodsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const payment_method_dto_1 = require("./payment-method.dto");
class GetPaymentMethodsDto extends (0, swagger_1.PickType)(payment_method_dto_1.PaymentMethodDto, [
    'personId',
]) {
}
exports.GetPaymentMethodsDto = GetPaymentMethodsDto;
//# sourceMappingURL=get-payment-methods.dto.js.map