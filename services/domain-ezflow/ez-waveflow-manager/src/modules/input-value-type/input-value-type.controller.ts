import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  KT_GET_INPUT_VALUE_TYPE,
  KT_GET_MANY_INPUT_VALUE_TYPES,
} from 'ez-utils';

import { InputValueTypeKafkaService } from './services/input-value-type-kafka.service';

@Controller('input-value-type')
export class InputValueTypeController {
  private logger = getLoggerConfig(InputValueTypeController.name);

  constructor(
    private readonly inputValueTypeKafkaService: InputValueTypeKafkaService,
  ) {
    this.logger.debug(
      `${InputValueTypeController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_INPUT_VALUE_TYPE)
  async getInputValueTypeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_INPUT_VALUE_TYPE}`,
      '',
      'getInputValueTypeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.inputValueTypeKafkaService.getInputValueType(message, key);
  }

  @MessagePattern(KT_GET_MANY_INPUT_VALUE_TYPES)
  async getManyInputValueTypesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_INPUT_VALUE_TYPES}`,
      '',
      'getManyInputValueTypesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.inputValueTypeKafkaService.getManyInputValueTypes(message, key);
  }
}
