import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { IKafkaConsumer, IKafkaConsumerOptions } from "../interface";
import { KafkaConsumerService } from "./kafka-consumer.service";
import { getLoggerConfig } from "../../utils";
import { LogStreamLevel } from "ez-logger";

@Injectable()
export class EzKafkaConsumer implements OnApplicationShutdown {
  private readonly consumers: IKafkaConsumer[] = [];
  private readonly logger = getLoggerConfig(EzKafkaConsumer.name);

  constructor() {
    this.logger.debug(
      `${EzKafkaConsumer.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.ProdStandard
    );
  }

  async consume({
    config,
    onMessage,
    topic,
    correlationId,
    broker,
  }: IKafkaConsumerOptions) {
    const consumerService = new KafkaConsumerService(
      topic,
      config,
      broker,
      correlationId
    );
    await consumerService.connect();

    // If you want separate logic for the retry messages, define a different callback:
    const onRetryMessage = async (retryMessage) => {
      // ... handle the retried message differently if needed
      await onMessage(retryMessage); // or do something else
    };

    // Notice we pass both the main callback and the retry callback
    await consumerService.consume(onMessage, onRetryMessage);

    this.consumers.push(consumerService);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
