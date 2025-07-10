import { Injectable } from '@nestjs/common';
import { GrowthMeasurementService } from './growth-measurement.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_GROWTH_MEASUREMENT,
  KT_GET_GROWTH_MEASUREMENTS,
  KT_GET_HISTORY_GROWTH_MEASUREMENT,
  CreateGrowthMeasurementDto,
  GetManyGrowthMeasurementsDto,
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
      async (
        createGrowthMeasurementDto: CreateGrowthMeasurementDto,
        traceId: string,
      ) =>
        await this.growthService.createGrowthMeasurement(
          createGrowthMeasurementDto,
          traceId,
        ),
    );
  }

  async getGrowthMeasurements(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_GROWTH_MEASUREMENTS,
      message,
      key,
      async (
        getGrowthMeasurementsDto: GetManyGrowthMeasurementsDto,
        traceId: string,
      ) =>
        await this.growthService.getGrowthMeasurements(
          getGrowthMeasurementsDto,
          traceId,
        ),
    );
  }

  async getGrowthMeasurementHistory(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_GROWTH_MEASUREMENT,
      message,
      key,
      async (
        getZtrackingGrowthMeasurementDto: GetZtrackingGrowthMeasurementDto,
        traceId: string,
      ) =>
        await this.growthService.getGrowthMeasurementHistory(
          getZtrackingGrowthMeasurementDto,
          traceId,
        ),
    );
  }
}
