"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentMethodDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const payment_method_dto_1 = require("./payment-method.dto");
class CreatePaymentMethodDto extends (0, swagger_1.PickType)(payment_method_dto_1.PaymentMethodDto, [
    'personId',
    'externalId',
    'type',
    'details',
    'isDefault',
]) {
}
exports.CreatePaymentMethodDto = CreatePaymentMethodDto;
//# sourceMappingURL=create-payment-method.dto.js.map