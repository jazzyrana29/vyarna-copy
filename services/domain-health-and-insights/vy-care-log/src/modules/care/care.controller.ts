import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { DiaperChangeKafkaService } from './services/diaper-change-kafka.service';
import { KT_CREATE_DIAPER_CHANGE, KT_GET_DIAPER_CHANGES } from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('care')
export class DiaperChangeController {
  private logger = getLoggerConfig(DiaperChangeController.name);

  constructor(
    private readonly diaperChangeKafkaService: DiaperChangeKafkaService,
  ) {
    this.logger.debug(
      `${DiaperChangeController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }


  @MessagePattern(KT_CREATE_DIAPER_CHANGE)
  async createDiaperChangeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_DIAPER_CHANGE}`,
      '',
      'createDiaperChangeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.diaperChangeKafkaService.createDiaperChange(message, key);
  }

  @MessagePattern(KT_GET_DIAPER_CHANGES)
  async getDiaperChangesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_DIAPER_CHANGES}`,
      '',
      'getDiaperChangesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.diaperChangeKafkaService.getDiaperChanges(message, key);
  }
}
