import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import * as express from 'express';
import * as process from 'process';

import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { getLoggerConfig } from './utils/common';
import { LogStreamLevel } from 'ez-logger';

async function bootstrap(): Promise<void> {
  const logger = getLoggerConfig('VyGatewayMain');
  const allowedOrigins = process.env.ALLOWED_ORIGINS!;

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error(`Not allowed by CORS ${origin}`));
        }
      },
    },
    bufferLogs: true,
    logger,
  });
  // attach the Socket.io adapter
  app.useWebSocketAdapter(new IoAdapter(app));

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

  await app.startAllMicroservices();

  const port = parseInt(process.env.APP_PORT || '0', 10) || 4040;
  await app.listen(port, () => {
    logger.debug(
      `${process.env.APP} is running on PORT: ${port}\nSwagger => ${process.env.SWAGGER_URL}`,
      '',
      'bootstrap',
      LogStreamLevel.ProdStandard,
    );
  });
}

bootstrap();
