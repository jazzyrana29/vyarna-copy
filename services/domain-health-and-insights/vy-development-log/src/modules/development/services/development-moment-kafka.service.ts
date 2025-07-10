import { Injectable } from '@nestjs/common';
import { DevelopmentMomentService } from './development-moment.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_DEVELOPMENT_MOMENT,
  KT_GET_DEVELOPMENT_MOMENTS,
  CreateDevelopmentMomentDto,
  GetManyDevelopmentMomentsDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class DevelopmentMomentKafkaService {
  public serviceName = DevelopmentMomentKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly momentService: DevelopmentMomentService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${DevelopmentMomentKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createDevelopmentMoment(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_DEVELOPMENT_MOMENT,
      message,
      key,
      async (
        createDevelopmentMomentDto: CreateDevelopmentMomentDto,
        traceId: string,
      ) =>
        await this.momentService.createDevelopmentMoment(
          createDevelopmentMomentDto,
          traceId,
        ),
    );
  }

  async getDevelopmentMoments(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_DEVELOPMENT_MOMENTS,
      message,
      key,
      async (
        getDevelopmentMomentsDto: GetManyDevelopmentMomentsDto,
        traceId: string,
      ) =>
        await this.momentService.getDevelopmentMoments(
          getDevelopmentMomentsDto,
          traceId,
        ),
    );
  }
}
