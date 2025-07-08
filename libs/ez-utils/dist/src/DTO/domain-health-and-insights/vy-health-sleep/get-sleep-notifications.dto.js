"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSleepNotificationsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_notification_dto_1 = require("./sleep-notification.dto");
class GetSleepNotificationsDto extends (0, swagger_1.PickType)(sleep_notification_dto_1.SleepNotificationDto, ['babyId']) {
}
exports.GetSleepNotificationsDto = GetSleepNotificationsDto;
//# sourceMappingURL=get-sleep-notifications.dto.js.map