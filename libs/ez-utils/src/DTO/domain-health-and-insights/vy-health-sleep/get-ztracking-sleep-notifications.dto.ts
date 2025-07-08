import { PickType } from '@nestjs/swagger';
import { SleepNotificationDto } from './sleep-notification.dto';

export class GetZtrackingSleepNotificationsDto extends PickType(SleepNotificationDto, ['babyId'] as const) {}
