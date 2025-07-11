import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as Sentry from "@sentry/node";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { getLoggerConfig } from "./utils/common";
import { LogStreamLevel } from "ez-logger";
import { Partitioners } from "kafkajs";

async function bootstrap(): Promise<void> {
  const logger = getLoggerConfig("Main");
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: logger,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  Sentry.init({ dsn: process.env.SENTRY_DNS });

  const broker = process.env.KAFKA_BROKER || "localhost:9092";
  const groupId = process.env.KAFKA_GROUP || "vy-person-contact";
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

  await app.startAllMicroservices();

  await app.listen(process.env.APP_PORT, () => {
    logger.debug(
      `${process.env.APP} microservice is running on Port: ${process.env.APP_PORT}\nbroker => ${process.env.KAFKA_BROKER}`,
      "",
      "bootstrap",
      LogStreamLevel.ProdStandard,
    );
  });
}

bootstrap();
