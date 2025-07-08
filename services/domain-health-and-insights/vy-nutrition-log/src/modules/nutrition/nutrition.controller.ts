import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { NutritionSessionKafkaService } from './services/nutrition-session-kafka.service';
import {
  KT_START_NUTRITION_SESSION,
  KT_GET_NUTRITION_SESSION,
  KT_GET_ZTRACKING_NUTRITION_SESSION,
  KT_LOG_NUTRITION_EVENT,
  KT_END_NUTRITION_SESSION,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('nutrition')
export class NutritionController {
  private logger = getLoggerConfig(NutritionController.name);

  constructor(
    private readonly nutritionSessionKafkaService: NutritionSessionKafkaService,
  ) {
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
    await this.nutritionSessionKafkaService.startSession(message, key);
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
    await this.nutritionSessionKafkaService.getSession(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_NUTRITION_SESSION)
  async getZtrackingNutritionSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_NUTRITION_SESSION}`,
      '',
      'getZtrackingNutritionSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.nutritionSessionKafkaService.getZtrackingSession(message, key);
  }

  @MessagePattern(KT_LOG_NUTRITION_EVENT)
  async logNutritionEventWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_LOG_NUTRITION_EVENT}`,
      '',
      'logNutritionEventWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.nutritionSessionKafkaService.logEvent(message, key);
  }

  @MessagePattern(KT_END_NUTRITION_SESSION)
  async endNutritionSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_END_NUTRITION_SESSION}`,
      '',
      'endNutritionSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.nutritionSessionKafkaService.endSession(message, key);
  }
}
