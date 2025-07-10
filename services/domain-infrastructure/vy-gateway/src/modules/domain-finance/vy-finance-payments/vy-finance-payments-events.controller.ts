import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import {
  KT_PAYMENT_SUCCEEDED,
  KT_PAYMENT_FAILED,
} from 'ez-utils';
import { FinancePaymentsWebsocket } from './vy-finance-payments.gateway';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class FinancePaymentsEventsController {
  private logger = getLoggerConfig(FinancePaymentsEventsController.name);

  constructor(private readonly websocket: FinancePaymentsWebsocket) {
    this.logger.debug(
      `${FinancePaymentsEventsController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_PAYMENT_SUCCEEDED)
  handleSucceeded(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    const { paymentIntentId, orderId, subscriptionId } = message;
    const traceId = message.traceId;
    this.logger.debug(
      `Kafka event ${KT_PAYMENT_SUCCEEDED} | key: ${key}`,
      traceId,
      'handleSucceeded',
      LogStreamLevel.DebugLight,
    );
    const userId = this.websocket.getUserForIntent(paymentIntentId);
    if (userId) {
      this.websocket.server
        .to(userId)
        .emit('payment-status-update', {
          paymentIntentId,
          orderId,
          subscriptionId,
          status: 'succeeded',
        });
    }
  }

  @MessagePattern(KT_PAYMENT_FAILED)
  handleFailed(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    const { paymentIntentId, errorCode, errorMessage } = message;
    const traceId = message.traceId;
    this.logger.debug(
      `Kafka event ${KT_PAYMENT_FAILED} | key: ${key}`,
      traceId,
      'handleFailed',
      LogStreamLevel.DebugLight,
    );
    const userId = this.websocket.getUserForIntent(paymentIntentId);
    if (userId) {
      this.websocket.server
        .to(userId)
        .emit('payment-status-update', {
          paymentIntentId,
          status: 'failed',
          errorCode,
          errorMessage,
        });
    }
  }
}
