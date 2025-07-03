import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { GrowthMeasurementKafkaService } from './services/growth-measurement-kafka.service';
import { KT_CREATE_GROWTH_MEASUREMENT, KT_GET_GROWTH_MEASUREMENTS } from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('development')
export class DevelopmentController {
  private logger = getLoggerConfig(DevelopmentController.name);

  constructor(
    private readonly growthMeasurementKafkaService: GrowthMeasurementKafkaService,
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
}
