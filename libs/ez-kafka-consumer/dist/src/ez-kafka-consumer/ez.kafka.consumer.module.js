"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EzKafkaConsumerModule = void 0;
const common_1 = require("@nestjs/common");
const kafka_consumer_service_1 = require("./services/kafka-consumer.service");
const ez_kafka_consumer_service_1 = require("./services/ez-kafka-consumer.service");
let EzKafkaConsumerModule = class EzKafkaConsumerModule {
};
exports.EzKafkaConsumerModule = EzKafkaConsumerModule;
exports.EzKafkaConsumerModule = EzKafkaConsumerModule = __decorate([
    (0, common_1.Module)({
        providers: [kafka_consumer_service_1.KafkaConsumerService, ez_kafka_consumer_service_1.EzKafkaConsumer],
        exports: [kafka_consumer_service_1.KafkaConsumerService, ez_kafka_consumer_service_1.EzKafkaConsumer],
    })
], EzKafkaConsumerModule);
//# sourceMappingURL=ez.kafka.consumer.module.js.map