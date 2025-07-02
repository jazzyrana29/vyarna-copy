import { Kafka, Message, Producer } from "kafkajs";
import { IKafkaProducer } from "../interface";
import { getLoggerConfig, sleep } from "../../utils";
import { LogStreamLevel } from "ez-logger";

export class KafkaProducerService implements IKafkaProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger = getLoggerConfig(KafkaProducerService.name);

  constructor(
    private readonly topic: string,
    broker: string,
  ) {
    this.logger.fatal(
      `${KafkaProducerService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.ProdStandard,
    );
    this.kafka = new Kafka({ brokers: [broker] });
    this.producer = this.kafka.producer();
  }

  async produce(message: Message): Promise<void> {
    this.logger.log(
      `Producing Message:${JSON.stringify(message)}`,
      "",
      "produce",
      LogStreamLevel.ProdStandard,
    );
    await this.producer.send({ topic: this.topic, messages: [message] });
  }

  async connect(): Promise<void> {
    try {
      this.logger.log(
        `Producer connected for topic: ${this.topic}`,
        "",
        "connect",
        LogStreamLevel.ProdStandard,
      );
      await this.producer.connect();
    } catch (error) {
      this.logger.error(
        `Failed to connect to Kafka Producer => ${error?.message || error.toString() || JSON.stringify(error)}\nRetrying after 5 second`,
        "",
        "connect",
        LogStreamLevel.ProdStandard,
      );
      await sleep(5000);
      await this.producer.connect();
    }
  }

  async disconnect(): Promise<void> {
    this.logger.log(
      `Disconnected kafka producer`,
      "",
      "disconnect",
      LogStreamLevel.ProdStandard,
    );
    await this.producer.disconnect();
  }
}
