import { Injectable } from '@nestjs/common';
import { GrowthMeasurementService } from './growth-measurement.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_GROWTH_MEASUREMENT,
  KT_GET_GROWTH_MEASUREMENTS,
  KT_GET_HISTORY_GROWTH_MEASUREMENT,
  CreateGrowthMeasurementDto,
  GetGrowthMeasurementsDto,
  GetZtrackingGrowthMeasurementDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';


@Injectable()
export class GrowthMeasurementKafkaService {
  public serviceName = GrowthMeasurementKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly growthService: GrowthMeasurementService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${GrowthMeasurementKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createGrowthMeasurement(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_GROWTH_MEASUREMENT,
      message,
      key,
      async (value: CreateGrowthMeasurementDto, traceId: string) =>
        await this.growthService.createGrowthMeasurement(value, traceId),
    );
  }

  async getGrowthMeasurements(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_GROWTH_MEASUREMENTS,
      message,
      key,
      async (value: GetGrowthMeasurementsDto, traceId: string) =>
        await this.growthService.getGrowthMeasurements(value, traceId),
    );
  }

  async getGrowthMeasurementHistory(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_GROWTH_MEASUREMENT,
      message,
      key,
      async (value: GetZtrackingGrowthMeasurementDto, traceId: string) =>
        await this.growthService.getGrowthMeasurementHistory(value, traceId),
    );
  }
}
