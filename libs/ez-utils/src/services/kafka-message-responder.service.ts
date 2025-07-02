import { getLoggerConfig } from "../config";
import { LogStreamLevel } from "ez-logger";
import { encodeKafkaMessage } from "../utils/kafka";
import { EzKafkaProducer } from "ez-kafka-producer";
import { KafkaMessage } from "../types/kafka";
import { KafkaContext } from "@nestjs/microservices";

export class KafkaMessageResponderService {
  private ezLogger = getLoggerConfig(KafkaMessageResponderService.name);

  constructor(private readonly broker: string) {
    this.ezLogger.debug(
      `${KafkaMessageResponderService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  async handleKafkaRequest(
    serviceMethod: (message: KafkaMessage, key: string) => Promise<void>,
    topicName: string,
    message: KafkaMessage,
    context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.ezLogger.debug(
      `Message Pattern hit for kafka topic : ${topicName}`,
      "",
      "handleKafkaRequest",
      LogStreamLevel.DebugLight,
    );
    return serviceMethod(message, key);
  }

  async produceKafkaResponse(
    serviceName: string,
    topic: string,
    message: KafkaMessage,
    key: string,
    processFn: (value: any, traceId: string) => Promise<any>,
  ): Promise<void> {
    const responseTopic = topic + "-response";
    let traceId = "";
    let kafkaResponseKey = "";
    try {
      const { traceId: incomingTraceId, ...value } = message;
      traceId = incomingTraceId;
      kafkaResponseKey = key;

      this.ezLogger.log(
        `Received message from Kafka: ${JSON.stringify(value, null, 2)}`,
        traceId,
        "produceKafkaResponse",
        LogStreamLevel.ProdStandard,
      );

      const response = await processFn(value, traceId);

      await new EzKafkaProducer().produce(
        this.broker,
        responseTopic,
        encodeKafkaMessage(
          serviceName,
          {
            response,
            kafkaResponseKey,
            kafkaResponseStatus: true,
            traceId,
          },
          kafkaResponseKey,
        ),
      );
    } catch (e) {
      this.ezLogger.error(
        `Error processing Kafka message: ${e}`,
        traceId,
        "produceKafkaResponse",
        LogStreamLevel.ProdStandard,
      );

      await new EzKafkaProducer().produce(
        this.broker,
        responseTopic,
        encodeKafkaMessage(
          serviceName,
          {
            error: e?.message || e,
            kafkaResponseKey,
            kafkaResponseStatus: false,
            traceId,
          },
          kafkaResponseKey,
        ),
      );
    }
  }
}
