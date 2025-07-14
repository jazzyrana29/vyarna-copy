"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInternalChargeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const internal_charge_dto_1 = require("./internal-charge.dto");
class CreateInternalChargeDto extends (0, swagger_1.PickType)(internal_charge_dto_1.InternalChargeDto, [
    'accountId',
    'amountCents',
    'description',
]) {
}
exports.CreateInternalChargeDto = CreateInternalChargeDto;
//# sourceMappingURL=create-internal-charge.dto.js.map