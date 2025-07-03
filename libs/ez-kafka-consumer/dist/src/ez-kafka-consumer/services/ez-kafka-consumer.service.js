"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EzKafkaConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EzKafkaConsumer = void 0;
const common_1 = require("@nestjs/common");
const kafka_consumer_service_1 = require("./kafka-consumer.service");
const utils_1 = require("../../utils");
const ez_logger_1 = require("ez-logger");
let EzKafkaConsumer = EzKafkaConsumer_1 = class EzKafkaConsumer {
    constructor() {
        this.consumers = [];
        this.logger = (0, utils_1.getLoggerConfig)(EzKafkaConsumer_1.name);
        this.logger.debug(`${EzKafkaConsumer_1.name} initialized`, "", "constructor", ez_logger_1.LogStreamLevel.ProdStandard);
    }
    async consume({ config, onMessage, topic, correlationId, broker, }) {
        const consumerService = new kafka_consumer_service_1.KafkaConsumerService(topic, config, broker, correlationId);
        await consumerService.connect();
        const onRetryMessage = async (retryMessage) => {
            await onMessage(retryMessage);
        };
        await consumerService.consume(onMessage, onRetryMessage);
        this.consumers.push(consumerService);
    }
    async onApplicationShutdown() {
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }
};
exports.EzKafkaConsumer = EzKafkaConsumer;
exports.EzKafkaConsumer = EzKafkaConsumer = EzKafkaConsumer_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EzKafkaConsumer);
//# sourceMappingURL=ez-kafka-consumer.service.js.map