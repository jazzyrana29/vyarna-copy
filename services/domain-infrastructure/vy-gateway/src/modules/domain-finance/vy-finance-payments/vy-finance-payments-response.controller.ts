import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';
import {
  KT_CREATE_PAYMENT_INTENT,
  KT_GET_PAYMENT_INTENT,
  KT_GET_ZTRACKING_PAYMENT_INTENT,
  KT_CREATE_REFUND,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class FinancePaymentsResponseController {
  private logger = getLoggerConfig(FinancePaymentsResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${FinancePaymentsResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_PAYMENT_INTENT + '-response')
  handleCreate(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_PAYMENT_INTENT} | key: ${key}`,
      '',
      'handleCreate',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_PAYMENT_INTENT + '-response')
  handleGet(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_PAYMENT_INTENT} | key: ${key}`,
      '',
      'handleGet',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_ZTRACKING_PAYMENT_INTENT + '-response')
  handleZtracking(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_ZTRACKING_PAYMENT_INTENT} | key: ${key}`,
      '',
      'handleZtracking',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CREATE_REFUND + '-response')
  handleRefund(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_REFUND} | key: ${key}`,
      '',
      'handleRefund',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
