import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { KT_PAYMENT_STATUS_UPDATE, PaymentStatusUpdatePayloadDto } from 'ez-utils';

@Injectable()
export class WebhooksKafkaService {
  readonly serviceName = WebhooksKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async updatePaymentStatus(
    paymentStatusUpdatePayload: PaymentStatusUpdatePayloadDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_PAYMENT_STATUS_UPDATE,
      paymentStatusUpdatePayload,
      traceId,
    );
  }
}
