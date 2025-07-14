"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSubscriptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const subscription_dto_1 = require("./subscription.dto");
class DeleteSubscriptionDto extends (0, swagger_1.PickType)(subscription_dto_1.SubscriptionDto, ['subscriptionId']) {
}
exports.DeleteSubscriptionDto = DeleteSubscriptionDto;
//# sourceMappingURL=delete-subscription.dto.js.map