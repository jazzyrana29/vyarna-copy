import { Injectable } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_MILESTONE,
  KT_GET_MILESTONES,
  CreateMilestoneDto,
  GetManyMilestonesDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class MilestoneKafkaService {
  public serviceName = MilestoneKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly milestoneService: MilestoneService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${MilestoneKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createMilestone(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_MILESTONE,
      message,
      key,
      async (
        createMilestoneDto: CreateMilestoneDto,
        traceId: string,
      ) =>
        await this.milestoneService.createMilestone(
          createMilestoneDto,
          traceId,
        ),
    );
  }

  async getMilestones(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MILESTONES,
      message,
      key,
      async (
        getMilestonesDto: GetManyMilestonesDto,
        traceId: string,
      ) =>
        await this.milestoneService.getMilestones(
          getMilestonesDto,
          traceId,
        ),
    );
  }
}
