"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapturePaymentIntentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const payment_intent_dto_1 = require("./payment-intent.dto");
class CapturePaymentIntentDto extends (0, swagger_1.PickType)(payment_intent_dto_1.PaymentIntentDto, ['paymentIntentId']) {
}
exports.CapturePaymentIntentDto = CapturePaymentIntentDto;
//# sourceMappingURL=capture-payment-intent.dto.js.map