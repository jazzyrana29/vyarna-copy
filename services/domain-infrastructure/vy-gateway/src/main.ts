import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Partitioners } from 'kafkajs';
import * as express from 'express';

import { AppModule } from './app.module';
import { getLoggerConfig, CORS_ALLOW } from './utils/common';
import { LogStreamLevel } from 'ez-logger';

async function bootstrap(): Promise<void> {
  // Configure custom logger
  const logger = getLoggerConfig('VyGatewayMain');

  // Create Nest app with CORS, buffered logs, and custom logger
  const app = await NestFactory.create(AppModule, {
    cors: CORS_ALLOW,
    bufferLogs: true,
    logger,
  });

  // Attach the Socket.io adapter
  app.useWebSocketAdapter(new IoAdapter(app));

  // Global validation + transformation for incoming DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const broker = process.env.KAFKA_BROKER || 'localhost:9092';
  const groupId = process.env.KAFKA_GROUP || 'vy-gateway';
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
      producer: { createPartitioner: Partitioners.LegacyPartitioner },
    },
  });

  // Enable URL-encoded requests
  app.use(express.urlencoded({ extended: true }));

  const swaggerConfigs = new DocumentBuilder()
    .setTitle(`${process.env.APP} Swagger`)
    .setDescription('All APIs descriptions')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
        description: 'Enter bearer token',
      },
      'bearerAuth',
    )
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, swaggerConfigs, options);
  SwaggerModule.setup('/api', app, document);

  // Start Kafka microservice listener
  await app.startAllMicroservices();

  // Start HTTP/WebSocket server (fallback to port 4040)
  const port = parseInt(process.env.APP_PORT || '', 10) || 4040;
  await app.listen(port, () => {
    logger.debug(
      `${process.env.APP || 'vy-gateway'} is running on PORT: ${port}\nSwagger => ${process.env.SWAGGER_URL}`,
      '',
      'bootstrap',
      LogStreamLevel.ProdStandard,
    );
  });
}

bootstrap();
