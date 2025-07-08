"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaymentRefundDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const refund_dto_1 = require("./refund.dto");
class GetPaymentRefundDto extends (0, swagger_1.PickType)(refund_dto_1.RefundDto, [
    'refundId',
]) {
}
exports.GetPaymentRefundDto = GetPaymentRefundDto;
//# sourceMappingURL=get-payment-refund.dto.js.map
