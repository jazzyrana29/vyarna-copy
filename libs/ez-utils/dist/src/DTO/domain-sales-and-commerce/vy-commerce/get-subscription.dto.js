"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSubscriptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const subscription_dto_1 = require("./subscription.dto");
class GetSubscriptionDto extends (0, swagger_1.PickType)(subscription_dto_1.SubscriptionDto, ['subscriptionId']) {
}
exports.GetSubscriptionDto = GetSubscriptionDto;
//# sourceMappingURL=get-subscription.dto.js.map