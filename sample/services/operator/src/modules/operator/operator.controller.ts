import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { OperatorKafkaService } from './services/operator-kafka.service';
import {
  KT_CREATE_OPERATOR_ENTITY,
  KT_GET_HISTORY_OPERATOR_ENTITY,
  KT_GET_MANY_OPERATORS,
  KT_GET_OPERATOR_ENTITY,
  KT_UPDATE_OPERATOR_ENTITY,
} from 'ez-utils';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';

@Controller('operators')
export class OperatorController {
  private logger = getLoggerConfig(OperatorController.name);

  constructor(private readonly operatorKafkaService: OperatorKafkaService) {
    this.logger.debug(
      `${OperatorController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_OPERATOR_ENTITY)
  async createOperatorWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_OPERATOR_ENTITY}`,
      '',
      'createOperatorWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.operatorKafkaService.createOperatorViaKafka(message, key);
  }

  @MessagePattern(KT_UPDATE_OPERATOR_ENTITY)
  async updateOperatorWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_OPERATOR_ENTITY}`,
      '',
      'updateOperatorWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.operatorKafkaService.updateOperatorViaKafka(message, key);
  }

  @MessagePattern(KT_GET_OPERATOR_ENTITY)
  async getOperatorWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_OPERATOR_ENTITY}`,
      '',
      'getOperatorWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.operatorKafkaService.getOperatorEntityViaKafka(message, key);
  }

  @MessagePattern(KT_GET_MANY_OPERATORS)
  async getManyOperatorsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_OPERATORS}`,
      '',
      'getManyOperatorsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.operatorKafkaService.getManyOperatorsViaKafka(message, key);
  }

  @MessagePattern(KT_GET_HISTORY_OPERATOR_ENTITY)
  async getHistoryOfOperatorWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_OPERATOR_ENTITY}`,
      '',
      'getHistoryOfOperatorWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.operatorKafkaService.getHistoryOfOperatorEntityViaKafka(
      message,
      key,
    );
  }
}
