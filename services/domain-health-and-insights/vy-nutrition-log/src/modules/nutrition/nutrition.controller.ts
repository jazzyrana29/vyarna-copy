import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { NutritionSessionKafkaService } from './services/nutrition-session-kafka.service';
import { KT_START_NUTRITION_SESSION, KT_GET_NUTRITION_SESSION } from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('nutrition')
export class NutritionController {
  private logger = getLoggerConfig(NutritionController.name);

  constructor(private readonly kafkaService: NutritionSessionKafkaService) {
    this.logger.debug(
      `${NutritionController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }


  @MessagePattern(KT_START_NUTRITION_SESSION)
  async startNutritionSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_START_NUTRITION_SESSION}`,
      '',
      'startNutritionSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.startSession(message, key);
  }

  @MessagePattern(KT_GET_NUTRITION_SESSION)
  async getNutritionSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_NUTRITION_SESSION}`,
      '',
      'getNutritionSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getSession(message, key);
  }
}
