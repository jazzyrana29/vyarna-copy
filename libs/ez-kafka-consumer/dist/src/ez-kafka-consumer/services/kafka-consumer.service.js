"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumerService = void 0;
const kafkajs_1 = require("kafkajs");
const retry = require("async-retry");
const utils_1 = require("../../utils");
const ez_logger_1 = require("ez-logger");
const ez_kafka_producer_1 = require("ez-kafka-producer");
class KafkaConsumerService {
    constructor(topic, config, broker, correlationId) {
        this.topic = topic;
        this.correlationId = correlationId;
        this.dlqMessages = new Map();
        this.logger = (0, utils_1.getLoggerConfig)(KafkaConsumerService.name);
        this.logger.debug(`${KafkaConsumerService.name} initialized`, "", "constructor", ez_logger_1.LogStreamLevel.ProdStandard);
        this.kafka = new kafkajs_1.Kafka({ brokers: [broker] });
        this.consumer = this.kafka.consumer({ ...config });
        this.retryConsumer = this.kafka.consumer({
            ...config,
            groupId: config.groupId + "-retry",
        });
        this.admin = this.kafka.admin();
        this.retryTopic = this.topic.topic + "-retry";
        this.maxRetryAttempts = parseInt(process.env.MAX_RETRY_ATTEMPTS, 10) || 5;
    }
    async createTopicIfNotExists(topicName) {
        const existingTopics = await this.admin.listTopics();
        if (!existingTopics.includes(topicName)) {
            await this.admin.createTopics({
                topics: [
                    {
                        topic: topicName,
                        numPartitions: 3,
                        replicationFactor: 1,
                    },
                ],
            });
            this.logger.log(`Topic ${topicName} created`, "", "createTopicIfNotExists", ez_logger_1.LogStreamLevel.ProdStandard);
        }
        else {
            this.logger.log(`Topic ${topicName} already exists`, "", "createTopicIfNotExists", ez_logger_1.LogStreamLevel.ProdStandard);
        }
    }
    async addMessageToDlq(message) {
        const topic = this.topic.topic;
        if (!this.dlqMessages.has(topic)) {
            this.dlqMessages.set(topic, []);
        }
        this.dlqMessages.get(topic).push(message);
    }
    async connect() {
        try {
            await this.createTopicIfNotExists(this.topic.topic);
            await this.createTopicIfNotExists(this.retryTopic);
            await this.consumer.connect();
            await this.retryConsumer.connect();
            this.logger.log("kafka consumer (main + retry) connected", "", "connect", ez_logger_1.LogStreamLevel.ProdStandard);
        }
        catch (err) {
            const errStr = err instanceof Error ? (err.stack ?? err.message) : String(err);
            this.logger.warn(`kafka consumer is sleep retrying after 5 sec => ${errStr}`, "", "connect", ez_logger_1.LogStreamLevel.ProdStandard);
            await (0, utils_1.sleep)(5000);
            this.logger.warn("kafka consumer retry after 5 sec", "", "connect", ez_logger_1.LogStreamLevel.ProdStandard);
            await this.consumer.connect();
            await this.retryConsumer.connect();
        }
    }
    async consume(onMessage, onRetryMessage) {
        if (!onRetryMessage) {
            onRetryMessage = onMessage;
        }
        await this.consumer.subscribe(this.topic);
        await this.retryConsumer.subscribe({
            topic: this.retryTopic,
        });
        this.logger.log(`Kafka consumer subscribed to main topic [${this.topic.topic}] and retry topic [${this.retryTopic}]`, "", "consume", ez_logger_1.LogStreamLevel.ProdStandard);
        let handleResolve;
        let handleReject;
        this.consumer.run({
            eachMessage: async (payload) => {
                await this.handleMainMessage(payload, onMessage, handleResolve, handleReject);
            },
        });
        this.retryConsumer.run({
            eachMessage: async (payload) => {
                await this.handleRetryMessage(payload, onRetryMessage, handleResolve, handleReject);
            },
        });
        return new Promise((resolve, reject) => {
            handleResolve = resolve;
            handleReject = reject;
        })
            .finally(async () => {
            this.logger.log("disconnecting main + retry consumers", this.correlationId, "consume->finally", ez_logger_1.LogStreamLevel.ProdStandard);
            await this.disconnect();
        })
            .catch((error) => {
            const errStr = error instanceof Error
                ? (error.stack ?? error.message)
                : String(error);
            this.logger.error(`Consume error => ${errStr}`, this.correlationId, "consume->catch", ez_logger_1.LogStreamLevel.ProdStandard);
            handleReject(error);
        });
    }
    async handleMainMessage({ message, partition }, onMessage, handleResolve, handleReject) {
        const traceId = this.getTraceId(message);
        const key = message.key?.toString() || "";
        this.logger.info(`Received message on MAIN topic [${this.topic.topic}] with key: ${key} for partition ${partition}`, traceId, "handleMainMessage", ez_logger_1.LogStreamLevel.ProdStandard);
        try {
            await retry(async () => {
                if (!this.correlationId) {
                    handleResolve(await onMessage(message));
                }
                else {
                    if (key === this.correlationId) {
                        this.logger.debug(`Correlation matches in MAIN. Disconnecting RETRY consumer first...`, traceId, "handleMainMessage", ez_logger_1.LogStreamLevel.ProdStandard);
                        await this.retryConsumer.disconnect();
                        handleResolve(await onMessage(message));
                    }
                    else {
                        this.logger.debug(`Correlation mismatch in MAIN consumer. Forwarding to RETRY topic`, traceId, "handleMainMessage", ez_logger_1.LogStreamLevel.ProdStandard);
                        await this.produceToRetryTopic(message, 0);
                    }
                }
            }, {
                retries: parseInt(process.env.KAFKA_RETRIES) || 3,
                onRetry: (err, attempt) => {
                    this.logger.error(`Retry attempt#${attempt} for MAIN consumer. Error => ${err?.message}`, traceId, "handleMainMessage", ez_logger_1.LogStreamLevel.ProdStandard);
                },
            });
        }
        catch (error) {
            this.logger.error(`Error in MAIN consumer => ${error?.message}\nMessage added to DLQ`, traceId, "handleMainMessage", ez_logger_1.LogStreamLevel.ProdStandard);
            await this.addMessageToDlq(message);
            handleReject?.(error);
        }
    }
    async handleRetryMessage({ message, partition }, onRetryMessage, handleResolve, handleReject) {
        const traceId = this.getTraceId(message);
        const key = message.key?.toString() || "";
        this.logger.info(`Received message on RETRY topic [${this.retryTopic}] with key: ${key} for partition ${partition}`, traceId, "handleRetryMessage", ez_logger_1.LogStreamLevel.ProdStandard);
        const currentAttempts = parseInt(message.headers?.["x-attempts"]?.toString() || "0", 10);
        try {
            await retry(async () => {
                if (!this.correlationId) {
                    handleResolve(await onRetryMessage(message));
                }
                else {
                    if (key === this.correlationId) {
                        this.logger.debug(`Correlation matches in RETRY. Disconnecting MAIN consumer first...`, traceId, "handleRetryMessage", ez_logger_1.LogStreamLevel.ProdStandard);
                        await this.consumer.disconnect();
                        handleResolve(await onRetryMessage(message));
                    }
                    else {
                        this.logger.debug(`Correlation mismatch in RETRY consumer`, traceId, "handleRetryMessage", ez_logger_1.LogStreamLevel.ProdStandard);
                        const nextAttempts = currentAttempts + 1;
                        if (nextAttempts >= this.maxRetryAttempts) {
                            this.logger.error(`Max retry attempts exceeded. Sending to DLQ`, traceId, "handleRetryMessage", ez_logger_1.LogStreamLevel.ProdStandard);
                            await this.addMessageToDlq(message);
                        }
                        else {
                            this.logger.debug(`Re-trying the message again on RETRY topic [attempt=${nextAttempts}]`, traceId, "handleRetryMessage", ez_logger_1.LogStreamLevel.ProdStandard);
                            await this.produceToRetryTopic(message, nextAttempts);
                        }
                    }
                }
            }, {
                retries: parseInt(process.env.KAFKA_RETRIES) || 3,
                onRetry: (err, attempt) => {
                    this.logger.error(`Retry attempt#${attempt} for RETRY consumer. Error => ${err?.message}`, traceId, "handleRetryMessage", ez_logger_1.LogStreamLevel.ProdStandard);
                },
            });
        }
        catch (error) {
            this.logger.error(`Error in RETRY consumer => ${error?.message}\nMessage added to DLQ`, traceId, "handleRetryMessage", ez_logger_1.LogStreamLevel.ProdStandard);
            await this.addMessageToDlq(message);
            handleReject?.(error);
        }
    }
    async produceToRetryTopic(message, attempts) {
        const producer = new ez_kafka_producer_1.EzKafkaProducer();
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
    getTraceId(message) {
        try {
            const valueBuffer = Buffer.from(message.value);
            const value = valueBuffer.toString("utf-8");
            this.logger.debug(`value : ${value}`, "", "consume -> consumer.run() -> eachMessage", ez_logger_1.LogStreamLevel.ProdStandard);
            return JSON.parse(value)?.traceId || "";
        }
        catch (e) {
            const errStr = e instanceof Error ? (e.stack ?? e.message) : String(e);
            this.logger.warn(`Failed to parse traceId: ${errStr}`, "", "getTraceId", ez_logger_1.LogStreamLevel.ProdStandard);
            return "";
        }
    }
    async getDLQ(topic) {
        return this.dlqMessages.get(topic) || [];
    }
    async disconnect() {
        this.logger.log("kafka consumers (main + retry) disconnected", "", "disconnect", ez_logger_1.LogStreamLevel.ProdStandard);
        await this.consumer.disconnect();
        await this.retryConsumer.disconnect();
    }
}
exports.KafkaConsumerService = KafkaConsumerService;
//# sourceMappingURL=kafka-consumer.service.js.map