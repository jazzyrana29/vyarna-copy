import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { SleepNotification } from '../../../entities/sleep_notification.entity';
import { ZtrackingSleepNotification } from '../../../entities/ztracking_sleep_notification.entity';
import { GetZtrackingSleepSessionDto, ZtrackingSleepNotificationDto } from 'ez-utils';

@Injectable()
export class ZtrackingSleepNotificationService {
  private logger = getLoggerConfig(ZtrackingSleepNotificationService.name);

  constructor(
    @InjectRepository(ZtrackingSleepNotification)
    private readonly ztrackingRepo: Repository<ZtrackingSleepNotification>,
  ) {
    this.logger.debug(
      `${ZtrackingSleepNotificationService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForSleepNotification(notification: SleepNotification, traceId: string): Promise<boolean> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...notification, versionDate: new Date() }),
    );
    this.logger.info(
      `ztracking sleep notification saved in database`,
      traceId,
      'createZtrackingForSleepNotification',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(entity?.ztrackingVersion);
  }

  async getZtrackingForSleepNotification(
    { babyId = '' }: GetZtrackingSleepSessionDto,
    traceId: string,
  ): Promise<ZtrackingSleepNotificationDto[]> {
    const entities = await this.ztrackingRepo.find({ where: { babyId } });
    if (!entities.length) {
      this.logger.error(
        `No ztracking entities found with this baby id => ${babyId}`,
        traceId,
        'getZtrackingForSleepNotification',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this baby id => ${babyId}`,
      );
    }
    this.logger.info(
      `${entities.length} ztracking sleep notification found in database`,
      traceId,
      'getZtrackingForSleepNotification',
      LogStreamLevel.ProdStandard,
    );
    return entities;
  }
}
