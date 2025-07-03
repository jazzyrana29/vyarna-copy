import { Consumer, ConsumerConfig, ConsumerSubscribeTopic, KafkaMessage } from "kafkajs";
import { IKafkaConsumer } from "../interface";
export declare class KafkaConsumerService implements IKafkaConsumer {
    private readonly topic;
    private readonly correlationId;
    readonly consumer: Consumer;
    private readonly retryConsumer;
    private readonly kafka;
    private readonly admin;
    private dlqMessages;
    private readonly logger;
    private readonly retryTopic;
    private maxRetryAttempts;
    constructor(topic: ConsumerSubscribeTopic, config: ConsumerConfig, broker: string, correlationId: string);
    private createTopicIfNotExists;
    addMessageToDlq(message: KafkaMessage): Promise<void>;
    connect(): Promise<void>;
    consume(onMessage: (message: KafkaMessage) => Promise<void>, onRetryMessage?: (message: KafkaMessage) => Promise<void>): Promise<void>;
    private handleMainMessage;
    private handleRetryMessage;
    private produceToRetryTopic;
    private getTraceId;
    getDLQ(topic: string): Promise<KafkaMessage[]>;
    disconnect(): Promise<void>;
}
