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
var EzKafkaProducer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EzKafkaProducer = void 0;
const common_1 = require("@nestjs/common");
const kafka_producer_service_1 = require("./kafka-producer.service");
const utils_1 = require("../../utils");
const ez_logger_1 = require("ez-logger");
let EzKafkaProducer = EzKafkaProducer_1 = class EzKafkaProducer {
    constructor() {
        this.producers = new Map();
        this.logger = (0, utils_1.getLoggerConfig)(EzKafkaProducer_1.name);
        this.logger.fatal(`${EzKafkaProducer_1.name} initialized`, "", "constructor", ez_logger_1.LogStreamLevel.ProdStandard);
    }
    async produce(broker, topic, message) {
        const producer = await this.getProducer(topic, broker);
        await producer.produce(message);
    }
    async onApplicationShutdown() {
        for (const producer of this.producers.values()) {
            await producer.disconnect();
        }
    }
    async getProducer(topic, broker) {
        let producer = this.producers.get(topic);
        if (!producer) {
            producer = new kafka_producer_service_1.KafkaProducerService(topic, broker);
            await producer.connect();
            this.producers.set(topic, producer);
        }
        return producer;
    }
};
exports.EzKafkaProducer = EzKafkaProducer;
exports.EzKafkaProducer = EzKafkaProducer = EzKafkaProducer_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EzKafkaProducer);
//# sourceMappingURL=ez-kafka-producer.service.js.map