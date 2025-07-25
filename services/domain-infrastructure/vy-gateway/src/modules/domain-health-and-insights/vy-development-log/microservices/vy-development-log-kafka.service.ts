import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  CreateGrowthMeasurementDto,
  GetManyGrowthMeasurementsDto,
  KT_CREATE_GROWTH_MEASUREMENT,
  KT_GET_GROWTH_MEASUREMENTS,
  GetZtrackingGrowthMeasurementDto,
  KT_GET_HISTORY_GROWTH_MEASUREMENT,
  CreateMilestoneDto,
  GetManyMilestonesDto,
  CreateTeethingEventDto,
  GetManyTeethingEventsDto,
  CreateDevelopmentMomentDto,
  GetManyDevelopmentMomentsDto,
} from 'ez-utils';
import { KT_CREATE_MILESTONE, KT_GET_MILESTONES } from 'ez-utils';
import { KT_CREATE_TEETHING_EVENT, KT_GET_TEETHING_EVENTS } from 'ez-utils';
import {
  KT_CREATE_DEVELOPMENT_MOMENT,
  KT_GET_DEVELOPMENT_MOMENTS,
} from 'ez-utils';

@Injectable()
export class DevelopmentLogKafkaService {
  private readonly serviceName = DevelopmentLogKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createGrowth(
    createGrowthMeasurementDto: CreateGrowthMeasurementDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_GROWTH_MEASUREMENT,
      createGrowthMeasurementDto,
      traceId,
    );
  }

  async getGrowth(
    getGrowthMeasurementsDto: GetManyGrowthMeasurementsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_GROWTH_MEASUREMENTS,
      getGrowthMeasurementsDto,
      traceId,
    );
  }

  async createMilestone(
    createMilestoneDto: CreateMilestoneDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_MILESTONE,
      createMilestoneDto,
      traceId,
    );
  }

  async getMilestones(getMilestonesDto: GetManyMilestonesDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_MILESTONES,
      getMilestonesDto,
      traceId,
    );
  }

  async createTeethingEvent(
    createTeethingEventDto: CreateTeethingEventDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_TEETHING_EVENT,
      createTeethingEventDto,
      traceId,
    );
  }

  async getTeethingEvents(
    getTeethingEventsDto: GetManyTeethingEventsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_TEETHING_EVENTS,
      getTeethingEventsDto,
      traceId,
    );
  }

  async createDevelopmentMoment(
    createDevelopmentMomentDto: CreateDevelopmentMomentDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_DEVELOPMENT_MOMENT,
      createDevelopmentMomentDto,
      traceId,
    );
  }

  async getDevelopmentMoments(
    getDevelopmentMomentsDto: GetManyDevelopmentMomentsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_DEVELOPMENT_MOMENTS,
      getDevelopmentMomentsDto,
      traceId,
    );
  }

  async getGrowthMeasurementHistory(
    getZtrackingGrowthMeasurementDto: GetZtrackingGrowthMeasurementDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_HISTORY_GROWTH_MEASUREMENT,
      getZtrackingGrowthMeasurementDto,
      traceId,
    );
  }
}
