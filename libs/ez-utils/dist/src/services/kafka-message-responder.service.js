"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaMessageResponderService = void 0;
const config_1 = require("../config");
const ez_logger_1 = require("ez-logger");
const kafka_1 = require("../utils/kafka");
const ez_kafka_producer_1 = require("ez-kafka-producer");
class KafkaMessageResponderService {
    constructor(broker) {
        this.broker = broker;
        this.ezLogger = (0, config_1.getLoggerConfig)(KafkaMessageResponderService.name);
        this.ezLogger.debug(`${KafkaMessageResponderService.name} initialized`, "", "constructor", ez_logger_1.LogStreamLevel.DebugLight);
    }
    async handleKafkaRequest(serviceMethod, topicName, message, context) {
        const key = context.getMessage().key.toString();
        this.ezLogger.debug(`Message Pattern hit for kafka topic : ${topicName}`, "", "handleKafkaRequest", ez_logger_1.LogStreamLevel.DebugLight);
        return serviceMethod(message, key);
    }
    async produceKafkaResponse(serviceName, topic, message, key, processFn) {
        const responseTopic = topic + "-response";
        let traceId = "";
        let kafkaResponseKey = "";
        try {
            const { traceId: incomingTraceId, ...value } = message;
            traceId = incomingTraceId;
            kafkaResponseKey = key;
            this.ezLogger.log(`Received message from Kafka: ${JSON.stringify(value, null, 2)}`, traceId, "produceKafkaResponse", ez_logger_1.LogStreamLevel.ProdStandard);
            const response = await processFn(value, traceId);
            await new ez_kafka_producer_1.EzKafkaProducer().produce(this.broker, responseTopic, (0, kafka_1.encodeKafkaMessage)(serviceName, {
                response,
                kafkaResponseKey,
                kafkaResponseStatus: true,
                traceId,
            }, kafkaResponseKey));
        }
        catch (e) {
            this.ezLogger.error(`Error processing Kafka message: ${e}`, traceId, "produceKafkaResponse", ez_logger_1.LogStreamLevel.ProdStandard);
            await new ez_kafka_producer_1.EzKafkaProducer().produce(this.broker, responseTopic, (0, kafka_1.encodeKafkaMessage)(serviceName, {
                error: e?.message || e,
                kafkaResponseKey,
                kafkaResponseStatus: false,
                traceId,
            }, kafkaResponseKey));
        }
    }
}
exports.KafkaMessageResponderService = KafkaMessageResponderService;
//# sourceMappingURL=kafka-message-responder.service.js.map