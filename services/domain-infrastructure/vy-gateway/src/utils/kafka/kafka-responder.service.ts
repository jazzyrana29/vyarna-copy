import { Injectable, OnModuleInit, Inject, BadRequestException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { encodeKafkaMessage } from 'ez-utils';
import { v4 as uuid } from 'uuid';
import { getLoggerConfig } from '../common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class KafkaResponderService implements OnModuleInit {
  private pendingRequests: Map<string, { resolve(value: unknown): void; reject(reason?: any): void }> = new Map();

  private logger = getLoggerConfig(KafkaResponderService.name);

  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {
    this.logger.debug(
      `${KafkaResponderService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async onModuleInit(): Promise<void> {
    await this.kafkaClient.connect();
  }

  async sendMessageAndWaitForResponse(serviceName: string, topic: string, payload: any, providedTraceId?: string): Promise<any> {
    const traceId = providedTraceId || uuid();
    const encoded = encodeKafkaMessage(serviceName, { ...payload, traceId });

    this.logger.info(
      `Sending Kafka message ${JSON.stringify({ serviceName, topic, traceId, kafkaKey: encoded.key }, null, 2)}`,
      traceId,
      'sendMessageAndWaitForResponse',
      LogStreamLevel.ProdStandard,
    );

    const promise = new Promise<any>((resolve, reject) => {
      this.pendingRequests.set(encoded.key, { resolve, reject });

      setTimeout(() => {
        if (this.pendingRequests.has(encoded.key)) {
          this.pendingRequests.delete(encoded.key);
          this.logger.error(
            `Timeout error waiting for response ${JSON.stringify({ kafkaKey: encoded.key, traceId }, null, 2)}`,
            traceId,
            'sendMessageAndWaitForResponse',
            LogStreamLevel.ProdStandard,
          );
          reject(new Error(`Timeout Error: Waiting response for ${encoded.key}`));
        }
      }, parseInt(process.env.REST_TIMEOUT || '45000'));
    });

    this.kafkaClient.emit(topic, encoded);

    return promise;
  }

  handleIncomingMessage(message: any) {
    const kafkaMessage = message;
    if (!kafkaMessage?.kafkaResponseKey) return;

    this.logger.info(
      `Received Kafka response ${JSON.stringify({ kafkaResponseKey: kafkaMessage.kafkaResponseKey }, null, 2)}`,
      kafkaMessage.traceId,
      'handleIncomingMessage',
      LogStreamLevel.ProdStandard,
    );

    const pending = this.pendingRequests.get(kafkaMessage.kafkaResponseKey);
    if (!pending) return;

    if (kafkaMessage.response) {
      pending.resolve(kafkaMessage.response);
    } else {
      pending.reject(new BadRequestException(kafkaMessage.error || 'Kafka response error'));
    }
    this.pendingRequests.delete(kafkaMessage.kafkaResponseKey);
  }
}
