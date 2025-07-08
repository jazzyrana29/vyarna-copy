"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleProviderPayoutDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const provider_payout_dto_1 = require("./provider-payout.dto");
class ScheduleProviderPayoutDto extends (0, swagger_1.PickType)(provider_payout_dto_1.ProviderPayoutDto, [
    'providerId',
    'accountId',
    'periodStart',
    'periodEnd',
    'amountCents',
]) {
}
exports.ScheduleProviderPayoutDto = ScheduleProviderPayoutDto;
//# sourceMappingURL=schedule-provider-payout.dto.js.map