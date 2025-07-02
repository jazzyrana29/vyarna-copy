import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';

import {
  GetInputValueTypeDto,
  GetManyInputValueTypesDto,
  KT_GET_INPUT_VALUE_TYPE,
  KT_GET_MANY_INPUT_VALUE_TYPES,
  KafkaMessageResponderService,
} from 'ez-utils';

import { InputValueTypeService } from './input-value-type.service';

@Injectable()
export class InputValueTypeKafkaService {
  private serviceName = InputValueTypeKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly inputValueTypeService: InputValueTypeService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
  }

  async getInputValueType(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_INPUT_VALUE_TYPE,
      message,
      key,
      async (value: GetInputValueTypeDto, traceId: string) =>
        await this.inputValueTypeService.findInputValueTypeService(
          value,
          traceId,
        ),
    );
  }

  async getManyInputValueTypes(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_INPUT_VALUE_TYPES,
      message,
      key,
      async (value: GetManyInputValueTypesDto, traceId: string) =>
        await this.inputValueTypeService.getManyInputValueTypeService(
          value,
          traceId,
        ),
    );
  }
}
