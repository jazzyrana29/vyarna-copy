import { Message } from "kafkajs";
import { IKafkaProducer } from "../interface";
export declare class KafkaProducerService implements IKafkaProducer {
    private readonly topic;
    private readonly kafka;
    private readonly producer;
    private readonly logger;
    constructor(topic: string, broker: string);
    produce(message: Message): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
