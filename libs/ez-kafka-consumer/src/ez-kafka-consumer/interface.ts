import { ConsumerConfig, ConsumerSubscribeTopic, KafkaMessage } from "kafkajs";

export interface IKafkaConsumer {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  consume: (onMessage: (message: any) => Promise<void>) => Promise<void>;
}

export interface IKafkaConsumerOptions {
  topic: ConsumerSubscribeTopic;
  config: ConsumerConfig;
  correlationId: string;
  broker: string;
  onMessage: (message: KafkaMessage) => Promise<void>;
}
