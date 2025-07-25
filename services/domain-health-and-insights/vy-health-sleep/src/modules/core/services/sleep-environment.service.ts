import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SleepEnvironment } from '../../../entities/sleep_environment.entity';
import { ZtrackingSleepEnvironmentService } from './ztracking-sleep-environment.service';
import {
  SleepEnvironmentDto,
  GetSleepEnvironmentsDto,
  DeleteSleepEnvironmentDto,
  encodeKafkaMessage,
  KT_RECORD_SLEEP_ENVIRONMENT,
} from 'ez-utils';
import { EzKafkaProducer } from 'ez-kafka-producer';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SleepEnvironmentService {
  private logger = getLoggerConfig(SleepEnvironmentService.name);

  constructor(
    @InjectRepository(SleepEnvironment)
    private readonly envRepo: Repository<SleepEnvironment>,
    private readonly ztrackingService: ZtrackingSleepEnvironmentService,
  ) {
    this.logger.debug(
      `${SleepEnvironmentService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEnvironment(
    sleepEnvironmentDto: SleepEnvironmentDto,
    traceId: string,
  ): Promise<SleepEnvironmentDto> {
    const entity = await this.envRepo.save(
      this.envRepo.create(sleepEnvironmentDto),
    );
    await this.ztrackingService.createZtrackingForSleepEnvironment(entity, traceId);

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_RECORD_SLEEP_ENVIRONMENT,
      encodeKafkaMessage(SleepEnvironmentService.name, {
        envId: entity.envId,
        sessionId: entity.sessionId,
        temperatureC: entity.temperatureC,
        humidityPct: entity.humidityPct,
        noiseDb: entity.noiseDb,
        lightLevel: entity.lightLevel,
        recordedAt: entity.recordedAt,
        traceId,
      }),
    );
    return entity;
  }

  async getEnvironments(
    getSleepEnvironmentsDto: GetSleepEnvironmentsDto,
    traceId: string,
  ): Promise<SleepEnvironmentDto[]> {
    const { sessionId } = getSleepEnvironmentsDto;
    const list = await this.envRepo.find({ where: { sessionId } });
    this.logger.info(
      `Retrieved ${list.length} environment metrics`,
      traceId,
      'getEnvironments',
      LogStreamLevel.DebugLight,
    );
    return list;
  }

  async deleteEnvironment(
    deleteSleepEnvironmentDto: DeleteSleepEnvironmentDto,
    traceId: string,
  ): Promise<void> {
    const { envId } = deleteSleepEnvironmentDto;
    const entity = await this.envRepo.findOne({ where: { envId } });
    if (!entity) {
      throw new NotFoundException(`No environment found => ${envId}`);
    }
    await this.envRepo.softDelete(envId);
    entity.deletedAt = new Date();
    await this.ztrackingService.createZtrackingForSleepEnvironment(entity, traceId);
  }
}
