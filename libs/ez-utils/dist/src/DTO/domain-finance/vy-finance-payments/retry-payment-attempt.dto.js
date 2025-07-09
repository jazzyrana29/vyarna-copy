"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryPaymentAttemptDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const payment_attempt_dto_1 = require("./payment-attempt.dto");
class RetryPaymentAttemptDto extends (0, swagger_1.PickType)(payment_attempt_dto_1.PaymentAttemptDto, ['attemptId']) {
}
exports.RetryPaymentAttemptDto = RetryPaymentAttemptDto;
//# sourceMappingURL=retry-payment-attempt.dto.js.map