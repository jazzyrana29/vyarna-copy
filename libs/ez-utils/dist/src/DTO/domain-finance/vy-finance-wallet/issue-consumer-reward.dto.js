"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueConsumerRewardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const consumer_reward_dto_1 = require("./consumer-reward.dto");
class IssueConsumerRewardDto extends (0, swagger_1.PickType)(consumer_reward_dto_1.ConsumerRewardDto, [
    'consumerId',
    'accountId',
    'sourceType',
    'sourceId',
    'amountCents',
]) {
}
exports.IssueConsumerRewardDto = IssueConsumerRewardDto;
//# sourceMappingURL=issue-consumer-reward.dto.js.map