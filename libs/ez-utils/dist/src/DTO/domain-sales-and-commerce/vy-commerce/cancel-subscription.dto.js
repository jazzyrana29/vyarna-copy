"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelSubscriptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const subscription_dto_1 = require("./subscription.dto");
class CancelSubscriptionDto extends (0, swagger_1.PickType)(subscription_dto_1.SubscriptionDto, ['subscriptionId']) {
}
exports.CancelSubscriptionDto = CancelSubscriptionDto;
//# sourceMappingURL=cancel-subscription.dto.js.map