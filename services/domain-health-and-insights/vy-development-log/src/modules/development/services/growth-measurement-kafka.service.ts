import { Injectable } from '@nestjs/common';
import { GrowthMeasurementService } from './growth-measurement.service';
import { KafkaMessageResponderService } from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

export const KT_CREATE_GROWTH_MEASUREMENT = 'create-growth-measurement';
export const KT_GET_GROWTH_MEASUREMENTS = 'get-growth-measurements';

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
      async (value: any, traceId: string) =>
        await this.growthService.create(value, traceId),
    );
  }

  async getGrowthMeasurements(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_GROWTH_MEASUREMENTS,
      message,
      key,
      async (value: { babyId: string }, traceId: string) =>
        await this.growthService.getAll(value.babyId),
    );
  }
}
