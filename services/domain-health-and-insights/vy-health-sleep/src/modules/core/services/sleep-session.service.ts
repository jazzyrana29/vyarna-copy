import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  Between,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';
import { SleepSession } from '../../../entities/sleep_session.entity';
import { ZtrackingSleepSessionService } from './ztracking-sleep-session.service';
import { EzKafkaProducer } from 'ez-kafka-producer';
import {
  CreateSleepSessionDto,
  SleepSessionDto,
  GetSleepSessionsDto,
  GetZtrackingSleepSessionDto,
  DeleteSleepSessionDto,
  ZtrackingSleepSessionDto,
  encodeKafkaMessage,
  KT_START_SLEEP_SESSION,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SleepSessionService {
  private logger = getLoggerConfig(SleepSessionService.name);

  constructor(
    @InjectRepository(SleepSession)
    private readonly sleepRepo: Repository<SleepSession>,
    private readonly ztrackingSleepSessionService: ZtrackingSleepSessionService,
  ) {
    this.logger.debug(
      `${SleepSessionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createSleepSession(
    createSleepSessionDto: CreateSleepSessionDto,
    traceId: string,
  ): Promise<SleepSessionDto> {
    const entity = this.sleepRepo.create(createSleepSessionDto);
    await this.sleepRepo.save(entity);
    this.logger.info(
      'SleepSession created',
      traceId,
      'createSleepSession',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingSleepSessionService.createZtrackingForSleepSession(
      entity,
      traceId,
    );

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_START_SLEEP_SESSION,
      encodeKafkaMessage(SleepSessionService.name, {
        sessionId: entity.sessionId,
        babyId: entity.babyId,
        personId: entity.personId,
        type: entity.type,
        startTime: entity.startTime,
        traceId,
      }),
    );

    return entity;
  }

  async getSleepSessions(
    getSleepSessionsDto: GetSleepSessionsDto,
    traceId: string,
  ): Promise<SleepSessionDto[]> {
    const { babyId, startTime, endTime } = getSleepSessionsDto;
    const where: any = {};
    if (babyId) {
      where.babyId = babyId;
    }
    if (startTime && endTime) {
      where.startTime = Between(startTime, endTime);
    } else if (startTime) {
      where.startTime = MoreThanOrEqual(startTime);
    } else if (endTime) {
      where.startTime = LessThanOrEqual(endTime);
    }
    const list = await this.sleepRepo.find({ where });
    this.logger.info(
      `Retrieved ${list.length} sleep sessions`,
      traceId,
      'getSleepSessions',
      LogStreamLevel.DebugLight,
    );
    return list;
  }

  async getZtrackingSleepSession(
    getZtrackingSleepSessionDto: GetZtrackingSleepSessionDto,
    traceId: string,
  ): Promise<ZtrackingSleepSessionDto[]> {
    return this.ztrackingSleepSessionService.getZtrackingForSleepSession(
      getZtrackingSleepSessionDto,
      traceId,
    );
  }

  async deleteSleepSession(
    deleteSleepSessionDto: DeleteSleepSessionDto,
    traceId: string,
  ): Promise<void> {
    const { sessionId } = deleteSleepSessionDto;
    const entity = await this.sleepRepo.findOne({ where: { sessionId } });
    if (!entity) {
      throw new NotFoundException(`Sleep session not found => ${sessionId}`);
    }
    await this.sleepRepo.softDelete(sessionId);
    entity.deletedAt = new Date();
    await this.ztrackingSleepSessionService.createZtrackingForSleepSession(
      entity,
      traceId,
    );
  }
}
