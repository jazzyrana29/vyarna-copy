import { OnApplicationShutdown } from "@nestjs/common";
import { IKafkaConsumerOptions } from "../interface";
export declare class EzKafkaConsumer implements OnApplicationShutdown {
    private readonly consumers;
    private readonly logger;
    constructor();
    consume({ config, onMessage, topic, correlationId, broker, }: IKafkaConsumerOptions): Promise<void>;
    onApplicationShutdown(): Promise<void>;
}
