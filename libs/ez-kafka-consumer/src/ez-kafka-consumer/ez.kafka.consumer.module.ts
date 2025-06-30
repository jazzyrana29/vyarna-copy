import { Module } from "@nestjs/common";

import { KafkaConsumerService } from "./services/kafka-consumer.service";
import { EzKafkaConsumer } from "./services/ez-kafka-consumer.service";

@Module({
  providers: [KafkaConsumerService, EzKafkaConsumer],
  exports: [KafkaConsumerService, EzKafkaConsumer],
})
export class EzKafkaConsumerModule {}
