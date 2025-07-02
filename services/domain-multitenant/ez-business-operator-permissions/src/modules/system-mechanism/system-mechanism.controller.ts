import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { SystemMechanismKafkaService } from './services/system-mechanism-kafka.service';
import {
  KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY,
  KT_GET_SYSTEM_MECHANISM_ENTITY,
  KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY,
} from 'ez-utils';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';

@Controller('system-mechanism')
export class SystemMechanismController {
  private logger = getLoggerConfig(SystemMechanismController.name);

  constructor(
    private readonly systemMechanismKafkaService: SystemMechanismKafkaService,
  ) {
    this.logger.debug(
      `${SystemMechanismController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_SYSTEM_MECHANISM_ENTITY)
  async getSystemMechanismWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SYSTEM_MECHANISM_ENTITY}`,
      '',
      'getSystemMechanismWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.systemMechanismKafkaService.getSystemMechanismEntityViaKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY)
  async getHistoryOfSystemMechanismWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY}`,
      '',
      'getHistoryOfSystemMechanismWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.systemMechanismKafkaService.getHistoryOfSystemMechanismEntityViaKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY)
  async getManySystemMechanismsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY}`,
      '',
      'getManySystemMechanismsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.systemMechanismKafkaService.getManySystemMechanismsViaKafka(
      message,
      key,
    );
  }
}
