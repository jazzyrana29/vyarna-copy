"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaProducerService = void 0;
const kafkajs_1 = require("kafkajs");
const utils_1 = require("../../utils");
const ez_logger_1 = require("ez-logger");
class KafkaProducerService {
    constructor(topic, broker) {
        this.topic = topic;
        this.logger = (0, utils_1.getLoggerConfig)(KafkaProducerService.name);
        this.logger.fatal(`${KafkaProducerService.name} initialized`, "", "constructor", ez_logger_1.LogStreamLevel.ProdStandard);
        this.kafka = new kafkajs_1.Kafka({ brokers: [broker] });
        this.producer = this.kafka.producer();
    }
    async produce(message) {
        this.logger.log(`Producing Message:${JSON.stringify(message)}`, "", "produce", ez_logger_1.LogStreamLevel.ProdStandard);
        await this.producer.send({ topic: this.topic, messages: [message] });
    }
    async connect() {
        try {
            this.logger.log(`Producer connected for topic: ${this.topic}`, "", "connect", ez_logger_1.LogStreamLevel.ProdStandard);
            await this.producer.connect();
        }
        catch (error) {
            this.logger.error(`Failed to connect to Kafka Producer => ${error?.message || error.toString() || JSON.stringify(error)}\nRetrying after 5 second`, "", "connect", ez_logger_1.LogStreamLevel.ProdStandard);
            await (0, utils_1.sleep)(5000);
            await this.producer.connect();
        }
    }
    async disconnect() {
        this.logger.log(`Disconnected kafka producer`, "", "disconnect", ez_logger_1.LogStreamLevel.ProdStandard);
        await this.producer.disconnect();
    }
}
exports.KafkaProducerService = KafkaProducerService;
//# sourceMappingURL=kafka-producer.service.js.map