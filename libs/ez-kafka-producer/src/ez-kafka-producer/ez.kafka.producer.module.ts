import { Module } from "@nestjs/common";
import { KafkaProducerService } from "./services/kafka-producer.service";
import { EzKafkaProducer } from "./services/ez-kafka-producer.service";

@Module({
  providers: [KafkaProducerService, EzKafkaProducer],
  exports: [KafkaProducerService, EzKafkaProducer],
})
export class EzKafkaProducerModule {}
