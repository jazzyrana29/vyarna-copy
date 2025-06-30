import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Message } from "kafkajs";
import { IKafkaProducer } from "../interface";
import { KafkaProducerService } from "./kafka-producer.service";
import { getLoggerConfig } from "../../utils";
import { LogStreamLevel } from "ez-logger";

@Injectable()
export class EzKafkaProducer implements OnApplicationShutdown {
  private readonly producers = new Map<string, IKafkaProducer>();
  private readonly logger = getLoggerConfig(EzKafkaProducer.name);

  constructor() {
    this.logger.fatal(
      `${EzKafkaProducer.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.ProdStandard,
    );
  }

  async produce(broker: string, topic: string, message: Message) {
    const producer = await this.getProducer(topic, broker);
    await producer.produce(message);
  }

  async onApplicationShutdown() {
    for (const producer of this.producers.values()) {
      await producer.disconnect();
    }
  }

  private async getProducer(topic: string, broker: string) {
    let producer = this.producers.get(topic);
    if (!producer) {
      producer = new KafkaProducerService(topic, broker);
      await producer.connect();
      this.producers.set(topic, producer);
    }
    return producer;
  }
}
