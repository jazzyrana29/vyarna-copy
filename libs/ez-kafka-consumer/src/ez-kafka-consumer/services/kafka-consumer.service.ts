import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopic,
  Kafka,
  KafkaMessage,
  Admin,
  EachMessagePayload,
  Producer,
} from "kafkajs";
import { IKafkaConsumer } from "../interface";
import * as retry from "async-retry";
import { getLoggerConfig, sleep } from "../../utils";
import { LogStreamLevel } from "ez-logger";
import { EzKafkaProducer } from "ez-kafka-producer";

/**
 * Class representing a Kafka consumer with automatic retry and Dead Letter Queue (DLQ) functionalities.
 */
export class KafkaConsumerService implements IKafkaConsumer {
  readonly consumer: Consumer; // Main consumer
  private readonly retryConsumer: Consumer; // Retry consumer
  private readonly kafka: Kafka;
  private readonly admin: Admin;
  private dlqMessages: Map<string, KafkaMessage[]> = new Map();

  private readonly logger = getLoggerConfig(KafkaConsumerService.name);

  // This is the name of the retry topic. By convention, we do topicName + "-retry"
  private readonly retryTopic: string;
  private maxRetryAttempts: number;

  /**
   * Creates an instance of KafkaConsumerService.
   * @param {ConsumerSubscribeTopic} topic - The Kafka topic to subscribe to (main topic).
   * @param {ConsumerConfig} config - The Kafka consumer configuration.
   * @param {string} broker - The Kafka broker address.
   * @param correlationId - the correlationId to uniquely identify the consumer
   */
  constructor(
    private readonly topic: ConsumerSubscribeTopic,
    config: ConsumerConfig,
    broker: string,
    private readonly correlationId: string
  ) {
    this.logger.debug(
      `${KafkaConsumerService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.ProdStandard
    );

    this.kafka = new Kafka({ brokers: [broker] });
    this.consumer = this.kafka.consumer({ ...config });

    // Create the retry consumer with a distinct groupId or config
    this.retryConsumer = this.kafka.consumer({
      ...config,
      groupId: config.groupId + "-retry", // For example, append `-retry` to ensure separate consumer group
    });

    this.admin = this.kafka.admin();

    // By convention, the retryTopic is {mainTopic}-retry
    this.retryTopic = (this.topic.topic as string) + "-retry";
    // Maximum retry attempts for messages in the retry topic
    this.maxRetryAttempts = parseInt(process.env.MAX_RETRY_ATTEMPTS, 10) || 5;
  }

  /**
   * Creates the topic if it does not exist.
   * @private
   * @param {string} topicName - The name of the topic to create.
   */
  private async createTopicIfNotExists(topicName: string) {
    const existingTopics = await this.admin.listTopics();
    if (!existingTopics.includes(topicName)) {
      await this.admin.createTopics({
        topics: [
          {
            topic: topicName,
            numPartitions: 3, // Adjust partitions as needed
            replicationFactor: 1, // Adjust replication factor as needed
          },
        ],
      });
      this.logger.log(
        `Topic ${topicName} created`,
        "",
        "createTopicIfNotExists",
        LogStreamLevel.ProdStandard
      );
    } else {
      this.logger.log(
        `Topic ${topicName} already exists`,
        "",
        "createTopicIfNotExists",
        LogStreamLevel.ProdStandard
      );
    }
  }

  /**
   * Adds a message to the Dead Letter Queue.
   * @private
   * @param {KafkaMessage} message - The message to be added to the DLQ.
   */
  async addMessageToDlq(message: KafkaMessage) {
    const topic = this.topic.topic as string;
    if (!this.dlqMessages.has(topic)) {
      this.dlqMessages.set(topic, []);
    }
    this.dlqMessages.get(topic).push(message);
  }

  /**
   * Connects the consumers (main and retry) to the Kafka cluster.
   */
  async connect() {
    try {
      // Ensure both main topic and retry topic exist
      await this.createTopicIfNotExists(this.topic.topic as string);
      await this.createTopicIfNotExists(this.retryTopic);

      // Connect admin, consumer, and retry consumer
      await this.consumer.connect();
      await this.retryConsumer.connect();

      this.logger.log(
        "kafka consumer (main + retry) connected",
        "",
        "connect",
        LogStreamLevel.ProdStandard
      );
    } catch (err) {
      this.logger.warn(
        "kafka consumer is sleep retrying after 5 sec",
        "",
        "connect",
        LogStreamLevel.ProdStandard
      );
      await sleep(5000);
      this.logger.warn(
        "kafka consumer retry after 5 sec",
        "",
        "connect",
        LogStreamLevel.ProdStandard
      );

      // Retry connecting
      await this.consumer.connect();
      await this.retryConsumer.connect();
    }
  }

  /**
   * Starts consuming messages from the main topic and the retry topic in parallel.
   * @param {(message: KafkaMessage) => Promise<void>} onMessage - Callback function to process each message (main).
   * @param {(message: KafkaMessage) => Promise<void>} onRetryMessage - Callback function to process each message (retry).
   */
  async consume(
    onMessage: (message: KafkaMessage) => Promise<void>,
    onRetryMessage?: (message: KafkaMessage) => Promise<void>
  ): Promise<any> {
    // If onRetryMessage is not provided, use the same onMessage for both
    if (!onRetryMessage) {
      onRetryMessage = onMessage;
    }

    // Subscribe main consumer
    await this.consumer.subscribe(this.topic);
    // Subscribe retry consumer
    await this.retryConsumer.subscribe({
      topic: this.retryTopic,
    });

    this.logger.log(
      `Kafka consumer subscribed to main topic [${this.topic.topic}] and retry topic [${this.retryTopic}]`,
      "",
      "consume",
      LogStreamLevel.ProdStandard
    );

    let handleResolve;
    let handleReject;

    // Run MAIN consumer
    this.consumer.run({
      eachMessage: async (payload) => {
        await this.handleMainMessage(
          payload,
          onMessage,
          handleResolve,
          handleReject
        );
      },
    });

    // Run RETRY consumer
    this.retryConsumer.run({
      eachMessage: async (payload) => {
        await this.handleRetryMessage(
          payload,
          onRetryMessage,
          handleResolve,
          handleReject
        );
      },
    });

    return new Promise((resolve, reject) => {
      handleResolve = resolve;
      handleReject = reject;
    })
      .finally(async () => {
        this.logger.log(
          "disconnecting main + retry consumers",
          this.correlationId,
          "consume->finally",
          LogStreamLevel.ProdStandard
        );
        await this.disconnect();
      })
      .catch((error) => {
        this.logger.error(
          `Consume error => ${error}`,
          this.correlationId,
          "consume->catch",
          LogStreamLevel.ProdStandard
        );
        handleReject(error);
      });
  }

  /**
   * Handle incoming messages from the MAIN consumer logic.
   */
  private async handleMainMessage(
    { message, partition }: EachMessagePayload,
    onMessage: (message: KafkaMessage) => Promise<void>,
    handleResolve: (value: unknown) => void,
    handleReject: (reason?: any) => void
  ) {
    const traceId = this.getTraceId(message);
    const key = message.key?.toString() || "";

    this.logger.info(
      `Received message on MAIN topic [${this.topic.topic}] with key: ${key}`,
      traceId,
      "handleMainMessage",
      LogStreamLevel.ProdStandard
    );

    try {
      await retry(
        async () => {
          // If no correlation ID was passed into the constructor, just handle the message
          if (!this.correlationId) {
            handleResolve(await onMessage(message));
          } else {
            // If correlation ID was passed, check if it matches the message key
            if (key === this.correlationId) {
              // Correlation ID matches -> disconnect RETRY consumer first
              this.logger.debug(
                `Correlation matches in MAIN. Disconnecting RETRY consumer first...`,
                traceId,
                "handleMainMessage",
                LogStreamLevel.ProdStandard
              );
              await this.retryConsumer.disconnect();

              // Then handle the message
              handleResolve(await onMessage(message));
            } else {
              // correlationId does NOT match => produce to RETRY topic for others to process
              this.logger.debug(
                `Correlation mismatch in MAIN consumer. Forwarding to RETRY topic`,
                traceId,
                "handleMainMessage",
                LogStreamLevel.ProdStandard
              );
              await this.produceToRetryTopic(message, 0); // Initial attempt = 0
            }
          }
        },
        {
          retries: parseInt(process.env.KAFKA_RETRIES) || 3,
          onRetry: (err, attempt) => {
            this.logger.error(
              `Retry attempt#${attempt} for MAIN consumer. Error => ${err?.message}`,
              traceId,
              "handleMainMessage",
              LogStreamLevel.ProdStandard
            );
          },
        }
      );
    } catch (error) {
      this.logger.error(
        `Error in MAIN consumer => ${error?.message}\nMessage added to DLQ`,
        traceId,
        "handleMainMessage",
        LogStreamLevel.ProdStandard
      );
      await this.addMessageToDlq(message);
      handleReject?.(error);
    }
  }

  /**
   * Handle incoming messages from the RETRY consumer logic.
   */
  private async handleRetryMessage(
    { message, partition }: EachMessagePayload,
    onRetryMessage: (message: KafkaMessage) => Promise<void>,
    handleResolve: (value: unknown) => void,
    handleReject: (reason?: any) => void
  ) {
    const traceId = this.getTraceId(message);
    const key = message.key?.toString() || "";

    this.logger.info(
      `Received message on RETRY topic [${this.retryTopic}] with key: ${key}`,
      traceId,
      "handleRetryMessage",
      LogStreamLevel.ProdStandard
    );

    // Check attempts from the headers or default to 0
    const currentAttempts = parseInt(
      message.headers?.["x-attempts"]?.toString() || "0",
      10
    );

    try {
      await retry(
        async () => {
          // If correlationId is not set in constructor, just process
          if (!this.correlationId) {
            handleResolve(await onRetryMessage(message));
          } else {
            // Check correlation ID
            if (key === this.correlationId) {
              // Correlation ID matches -> disconnect MAIN consumer first
              this.logger.debug(
                `Correlation matches in RETRY. Disconnecting MAIN consumer first...`,
                traceId,
                "handleRetryMessage",
                LogStreamLevel.ProdStandard
              );
              await this.consumer.disconnect();

              // Then handle the message
              handleResolve(await onRetryMessage(message));
            } else {
              // correlationId does NOT match
              this.logger.debug(
                `Correlation mismatch in RETRY consumer`,
                traceId,
                "handleRetryMessage",
                LogStreamLevel.ProdStandard
              );

              // Increase attempts
              const nextAttempts = currentAttempts + 1;
              if (nextAttempts >= this.maxRetryAttempts) {
                // Exceeds max attempts -> DLQ
                this.logger.error(
                  `Max retry attempts exceeded. Sending to DLQ`,
                  traceId,
                  "handleRetryMessage",
                  LogStreamLevel.ProdStandard
                );
                await this.addMessageToDlq(message);
              } else {
                // Re-produce the message to RETRY topic with incremented attempts
                this.logger.debug(
                  `Re-trying the message again on RETRY topic [attempt=${nextAttempts}]`,
                  traceId,
                  "handleRetryMessage",
                  LogStreamLevel.ProdStandard
                );
                await this.produceToRetryTopic(message, nextAttempts);
              }
            }
          }
        },
        {
          retries: parseInt(process.env.KAFKA_RETRIES) || 3,
          onRetry: (err, attempt) => {
            this.logger.error(
              `Retry attempt#${attempt} for RETRY consumer. Error => ${err?.message}`,
              traceId,
              "handleRetryMessage",
              LogStreamLevel.ProdStandard
            );
          },
        }
      );
    } catch (error) {
      this.logger.error(
        `Error in RETRY consumer => ${error?.message}\nMessage added to DLQ`,
        traceId,
        "handleRetryMessage",
        LogStreamLevel.ProdStandard
      );
      await this.addMessageToDlq(message);
      handleReject?.(error);
    }
  }

  /**
   * Produce the message to the retry topic with a given attempt count in the headers.
   */
  private async produceToRetryTopic(message: KafkaMessage, attempts: number) {
    const producer = new EzKafkaProducer();
    // @ts-ignore
    const broker = this.kafka?.config?.brokers?.[0] || "localhost:9092";

    await producer.produce(broker, this.retryTopic, {
      key: message.key?.toString(),
      value: message.value?.toString(),
      headers: {
        ...message.headers,
        "x-attempts": attempts.toString(),
      },
    });
  }

  /**
   * Helper to parse and get traceId from message's value if it is JSON.
   */
  private getTraceId(message: KafkaMessage): string {
    try {
      const valueBuffer = Buffer.from(message.value);
      const value = valueBuffer.toString("utf-8");
      this.logger.debug(
        `value : ${value}`,
        "",
        "consume -> consumer.run() -> eachMessage",
        LogStreamLevel.ProdStandard
      );
      return JSON.parse(value)?.traceId || "";
    } catch (e) {
      return "";
    }
  }

  /**
   * Retrieves messages from the Dead Letter Queue for a specific topic.
   * @param {string} topic - The topic for which to retrieve DLQ messages.
   * @returns {Promise<KafkaMessage[]>} - A promise that resolves to an array of Kafka messages.
   */
  async getDLQ(topic: string): Promise<KafkaMessage[]> {
    return this.dlqMessages.get(topic) || [];
  }

  /**
   * Disconnects both the main consumer and the retry consumer from the Kafka cluster.
   */
  async disconnect() {
    this.logger.log(
      "kafka consumers (main + retry) disconnected",
      "",
      "disconnect",
      LogStreamLevel.ProdStandard
    );
    await this.consumer.disconnect();
    await this.retryConsumer.disconnect();
  }
}
