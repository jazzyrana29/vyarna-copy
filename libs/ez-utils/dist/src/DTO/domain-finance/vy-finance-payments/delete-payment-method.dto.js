"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePaymentMethodDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const payment_method_dto_1 = require("./payment-method.dto");
class DeletePaymentMethodDto extends (0, swagger_1.PickType)(payment_method_dto_1.PaymentMethodDto, [
    'paymentMethodId',
]) {
}
exports.DeletePaymentMethodDto = DeletePaymentMethodDto;
//# sourceMappingURL=delete-payment-method.dto.js.map