"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentIntentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const payment_intent_dto_1 = require("./payment-intent.dto");
class CreatePaymentIntentDto extends (0, swagger_1.PickType)(payment_intent_dto_1.PaymentIntentDto, [
    'orderId',
    'subscriptionId',
    'amountCents',
    'currency',
    'metadata',
]) {
}
exports.CreatePaymentIntentDto = CreatePaymentIntentDto;
//# sourceMappingURL=create-payment-intent.dto.js.map