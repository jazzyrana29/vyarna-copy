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

async function bootstrap() {
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
    logger: ['error', 'warn', 'log', 'debug', 'verbose'], // enable all levels if you want
  });
  // attach the Socket.io adapter
  app.useWebSocketAdapter(new IoAdapter(app));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const document = SwaggerModule.createDocument(app, swaggerConfigs, options);
  SwaggerModule.setup('/api', app, document);

  await app.listen(process.env.APP_PORT!, () => {
    console.log(
      `${process.env.APP} is running on PORT: ${process.env.APP_PORT}\nSwagger => ${process.env.SWAGGER_URL}`,
    );
  });
}

bootstrap();
