import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { KafkaResponderService } from './kafka-responder.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
            retry: {
              retries: 10,
              initialRetryTime: 300,
            },
            connectionTimeout: 5000,
            requestTimeout: 12000,
          },
          consumer: {
            groupId: process.env.KAFKA_GROUP || 'ez-waveflow-api',
            sessionTimeout: 90000,
            heartbeatInterval: 30000,
          },
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
        },
      },
    ]),
  ],
  providers: [KafkaResponderService],
  exports: [KafkaResponderService],
})
export class KafkaModule {}
