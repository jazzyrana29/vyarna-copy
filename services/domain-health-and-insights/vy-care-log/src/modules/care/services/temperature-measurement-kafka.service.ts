import { Injectable } from '@nestjs/common';
import { TemperatureMeasurementService } from './temperature-measurement.service';
import { ZtrackingTemperatureMeasurementService } from './ztracking-temperature-measurement.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_TEMPERATURE_MEASUREMENT,
  KT_GET_TEMPERATURE_MEASUREMENTS,
  KT_GET_ZTRACKING_TEMPERATURE_MEASUREMENT,
  CreateTemperatureMeasurementDto,
  GetManyTemperatureMeasurementsDto,
  GetZtrackingTemperatureMeasurementDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class TemperatureMeasurementKafkaService {
  public serviceName = TemperatureMeasurementKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly tempService: TemperatureMeasurementService,
    private readonly ztrackingService: ZtrackingTemperatureMeasurementService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${TemperatureMeasurementKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createTemperatureMeasurement(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_TEMPERATURE_MEASUREMENT,
      message,
      key,
      async (value: CreateTemperatureMeasurementDto, traceId: string) =>
        await this.tempService.createTemperatureMeasurement(value, traceId),
    );
  }

  async getTemperatureMeasurements(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_TEMPERATURE_MEASUREMENTS,
      message,
      key,
      async (value: GetManyTemperatureMeasurementsDto, traceId: string) =>
        await this.tempService.getTemperatureMeasurements(value, traceId),
    );
  }

  async getZtrackingTemperatureMeasurement(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_TEMPERATURE_MEASUREMENT,
      message,
      key,
      async (value: GetZtrackingTemperatureMeasurementDto, traceId: string) =>
        await this.ztrackingService.getZtrackingForTemperatureMeasurement(value, traceId),
    );
  }
}
