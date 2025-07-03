import { OnApplicationShutdown } from "@nestjs/common";
import { Message } from "kafkajs";
export declare class EzKafkaProducer implements OnApplicationShutdown {
    private readonly producers;
    private readonly logger;
    constructor();
    produce(broker: string, topic: string, message: Message): Promise<void>;
    onApplicationShutdown(): Promise<void>;
    private getProducer;
}
