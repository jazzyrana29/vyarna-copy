import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { GrowthMeasurementKafkaService } from './services/growth-measurement-kafka.service';
import { MilestoneKafkaService } from './services/milestone-kafka.service';
import { TeethingEventKafkaService } from './services/teething-event-kafka.service';
import { DevelopmentMomentKafkaService } from './services/development-moment-kafka.service';
import {
  KT_CREATE_GROWTH_MEASUREMENT,
  KT_GET_GROWTH_MEASUREMENTS,
  KT_GET_HISTORY_GROWTH_MEASUREMENT,
  KT_CREATE_MILESTONE,
  KT_GET_MILESTONES,
  KT_CREATE_TEETHING_EVENT,
  KT_GET_TEETHING_EVENTS,
  KT_CREATE_DEVELOPMENT_MOMENT,
  KT_GET_DEVELOPMENT_MOMENTS,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('development')
export class DevelopmentController {
  private logger = getLoggerConfig(DevelopmentController.name);

  constructor(
    private readonly growthMeasurementKafkaService: GrowthMeasurementKafkaService,
    private readonly milestoneKafkaService: MilestoneKafkaService,
    private readonly teethingEventKafkaService: TeethingEventKafkaService,
    private readonly developmentMomentKafkaService: DevelopmentMomentKafkaService,
  ) {
    this.logger.debug(
      `${DevelopmentController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }


  @MessagePattern(KT_CREATE_GROWTH_MEASUREMENT)
  async createGrowthMeasurementWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_GROWTH_MEASUREMENT}`,
      '',
      'createGrowthMeasurementWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.growthMeasurementKafkaService.createGrowthMeasurement(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_GROWTH_MEASUREMENTS)
  async getGrowthMeasurementsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_GROWTH_MEASUREMENTS}`,
      '',
      'getGrowthMeasurementsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.growthMeasurementKafkaService.getGrowthMeasurements(message, key);
  }

  @MessagePattern(KT_GET_HISTORY_GROWTH_MEASUREMENT)
  async getGrowthMeasurementHistoryWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_GROWTH_MEASUREMENT}`,
      '',
      'getGrowthMeasurementHistoryWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.growthMeasurementKafkaService.getGrowthMeasurementHistory(
      message,
      key,
    );
  }

  @MessagePattern(KT_CREATE_MILESTONE)
  async createMilestoneWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_MILESTONE}`,
      '',
      'createMilestoneWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.milestoneKafkaService.createMilestone(message, key);
  }

  @MessagePattern(KT_GET_MILESTONES)
  async getMilestonesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MILESTONES}`,
      '',
      'getMilestonesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.milestoneKafkaService.getMilestones(message, key);
  }

  @MessagePattern(KT_CREATE_TEETHING_EVENT)
  async createTeethingEventWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_TEETHING_EVENT}`,
      '',
      'createTeethingEventWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.teethingEventKafkaService.createTeethingEvent(message, key);
  }

  @MessagePattern(KT_GET_TEETHING_EVENTS)
  async getTeethingEventsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_TEETHING_EVENTS}`,
      '',
      'getTeethingEventsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.teethingEventKafkaService.getTeethingEvents(message, key);
  }

  @MessagePattern(KT_CREATE_DEVELOPMENT_MOMENT)
  async createDevelopmentMomentWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_DEVELOPMENT_MOMENT}`,
      '',
      'createDevelopmentMomentWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.developmentMomentKafkaService.createDevelopmentMoment(message, key);
  }

  @MessagePattern(KT_GET_DEVELOPMENT_MOMENTS)
  async getDevelopmentMomentsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_DEVELOPMENT_MOMENTS}`,
      '',
      'getDevelopmentMomentsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.developmentMomentKafkaService.getDevelopmentMoments(message, key);
  }
}
