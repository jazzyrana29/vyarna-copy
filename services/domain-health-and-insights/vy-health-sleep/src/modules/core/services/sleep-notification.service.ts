import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SleepNotification } from '../../../entities/sleep_notification.entity';
import { ZtrackingSleepNotificationService } from './ztracking-sleep-notification.service';
import {
  SleepNotificationDto,
  GetSleepNotificationsDto,
  DeleteSleepNotificationDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SleepNotificationService {
  private logger = getLoggerConfig(SleepNotificationService.name);

  constructor(
    @InjectRepository(SleepNotification)
    private readonly notificationRepo: Repository<SleepNotification>,
    private readonly ztrackingService: ZtrackingSleepNotificationService,
  ) {
    this.logger.debug(
      `${SleepNotificationService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createNotification(
    sleepNotificationDto: SleepNotificationDto,
    traceId: string,
  ): Promise<SleepNotificationDto> {
    const entity = await this.notificationRepo.save(
      this.notificationRepo.create(sleepNotificationDto),
    );
    await this.ztrackingService.createZtrackingForSleepNotification(entity, traceId);
    return entity;
  }

  async getNotifications(
    getSleepNotificationsDto: GetSleepNotificationsDto,
    traceId: string,
  ): Promise<SleepNotificationDto[]> {
    const { babyId } = getSleepNotificationsDto;
    const list = await this.notificationRepo.find({ where: { babyId } });
    this.logger.info(
      `Retrieved ${list.length} notifications`,
      traceId,
      'getNotifications',
      LogStreamLevel.DebugLight,
    );
    return list;
  }

  async deleteNotification(
    deleteSleepNotificationDto: DeleteSleepNotificationDto,
    traceId: string,
  ): Promise<void> {
    const { notificationId } = deleteSleepNotificationDto;
    const entity = await this.notificationRepo.findOne({ where: { notificationId } });
    if (!entity) {
      throw new NotFoundException(`No notification found => ${notificationId}`);
    }
    await this.notificationRepo.softDelete(notificationId);
    entity.updatedAt = new Date();
    await this.ztrackingService.createZtrackingForSleepNotification(entity, traceId);
  }
}
