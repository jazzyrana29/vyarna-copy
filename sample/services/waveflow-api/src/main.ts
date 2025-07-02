import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from './utils/common';

import * as express from 'express';
import * as Sentry from '@sentry/node';
import * as process from 'process';
import { Partitioners } from 'kafkajs';

import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

import { AppModule } from './app.module';

async function bootstrap() {
  const allowedOrigins = process.env.ALLOWED_ORIGINS;
  const logger = getLoggerConfig('Main');

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    },
    bufferLogs: true,
    logger: logger,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(express.urlencoded({ extended: true }));

  Sentry.init({
    dsn: process.env.SENTRY_DNS,
  });

  // It will be handled internally for the time being.
  // app.useGlobalInterceptors(
  //   new TimeoutInterceptor(Number(process.env.REST_TIMEOUT || 10000)),
  // );

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

  const broker = process.env.KAFKA_BROKER || 'localhost:9092';
  const groupId = process.env.KAFKA_GROUP || 'ez-waveflow-api';
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [broker],
        retry: {
          retries: 10,
          initialRetryTime: 300,
        },
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

  await app.startAllMicroservices();

  await app.listen(process.env.APP_PORT, () => {
    logger.debug(
      `${process.env.APP} is running on PORT: ${process.env.APP_PORT}\nSwagger => ${process.env.SWAGGER_URL}`,
      '',
      'bootstrap',
      LogStreamLevel.ProdStandard,
    );
  });
}

// Handle unhandled promise rejections (?)
// This work, but hanging problem doesnt fix (correlationID doesnt resolve)
// process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
//   console.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
// });

bootstrap();
