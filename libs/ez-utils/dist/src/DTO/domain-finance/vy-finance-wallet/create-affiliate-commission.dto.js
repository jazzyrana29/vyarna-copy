"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAffiliateCommissionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const affiliate_commission_dto_1 = require("./affiliate-commission.dto");
class CreateAffiliateCommissionDto extends (0, swagger_1.PickType)(affiliate_commission_dto_1.AffiliateCommissionDto, [
    'partnerId',
    'accountId',
    'orderId',
    'amountCents',
]) {
}
exports.CreateAffiliateCommissionDto = CreateAffiliateCommissionDto;
//# sourceMappingURL=create-affiliate-commission.dto.js.map