"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRefundDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const refund_dto_1 = require("./refund.dto");
class CreateRefundDto extends (0, swagger_1.PickType)(refund_dto_1.RefundDto, [
    'paymentIntentId',
    'amountCents',
    'reason',
    'metadata',
]) {
}
exports.CreateRefundDto = CreateRefundDto;
//# sourceMappingURL=create-refund.dto.js.map