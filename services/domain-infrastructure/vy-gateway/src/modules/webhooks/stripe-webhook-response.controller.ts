import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { KT_PAYMENT_STATUS_UPDATE } from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class StripeWebhookResponseController {
  private logger = getLoggerConfig(StripeWebhookResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${StripeWebhookResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_PAYMENT_STATUS_UPDATE + '-response')
  handlePaymentIntentStatusUpdate(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_PAYMENT_STATUS_UPDATE} | key: ${key}`,
      '',
      'handlePaymentIntentStatusUpdate',
      LogStreamLevel.DebugLight,
    );
    console.log('Payment status processed:', message);
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
