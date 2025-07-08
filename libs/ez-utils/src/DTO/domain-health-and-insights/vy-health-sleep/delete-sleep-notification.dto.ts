import { PickType } from '@nestjs/swagger';
import { SleepNotificationDto } from './sleep-notification.dto';

export class DeleteSleepNotificationDto extends PickType(SleepNotificationDto, ['notificationId'] as const) {}
