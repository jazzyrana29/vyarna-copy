"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetZtrackingSleepNotificationsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sleep_notification_dto_1 = require("./sleep-notification.dto");
class GetZtrackingSleepNotificationsDto extends (0, swagger_1.PickType)(sleep_notification_dto_1.SleepNotificationDto, ['babyId']) {}
exports.GetZtrackingSleepNotificationsDto = GetZtrackingSleepNotificationsDto;
//# sourceMappingURL=get-ztracking-sleep-notifications.dto.js.map
