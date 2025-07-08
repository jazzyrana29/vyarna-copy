"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSleepNotificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_notification_dto_1 = require("./sleep-notification.dto");
class DeleteSleepNotificationDto extends (0, swagger_1.PickType)(sleep_notification_dto_1.SleepNotificationDto, ['notificationId']) {
}
exports.DeleteSleepNotificationDto = DeleteSleepNotificationDto;
//# sourceMappingURL=delete-sleep-notification.dto.js.map