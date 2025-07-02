import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { getLoggerConfig } from './utils/common';
import { LogStreamLevel } from 'ez-logger';

async function bootstrap() {
  // Configure custom logger
  const logger = getLoggerConfig('GamesWSMain');

  // Create Nest app with CORS, buffered logs, and custom logger
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*' },
    bufferLogs: true,
    logger,
  });

  // Global validation + transformation for incoming DTOs
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Configure Kafka microservice
  const broker = process.env.KAFKA_BROKER || 'localhost:9092';
  const groupId = process.env.KAFKA_GROUP || 'games-websocket';
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [broker],
        retry: { retries: 10, initialRetryTime: 300 },
        connectionTimeout: 5000,
        requestTimeout: 12000,
      },
      consumer: {
        groupId,
        sessionTimeout: 90000,
        heartbeatInterval: 30000,
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    },
  });

  // Start Kafka microservice listener
  await app.startAllMicroservices();

  // Start HTTP/WebSocket server (fallback to port 4000)
  const port = parseInt(process.env.APP_PORT || '', 10) || 4000;
  await app.listen(port, () => {
    logger.debug(
      `${process.env.APP_NAME || 'games-websocket'} listening on port ${port}`,
      '',
      'bootstrap',
      LogStreamLevel.ProdStandard,
    );
  });
}

bootstrap();
