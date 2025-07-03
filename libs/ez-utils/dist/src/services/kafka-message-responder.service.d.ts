import { KafkaMessage } from "../types/kafka";
import { KafkaContext } from "@nestjs/microservices";
export declare class KafkaMessageResponderService {
    private readonly broker;
    private ezLogger;
    constructor(broker: string);
    handleKafkaRequest(serviceMethod: (message: KafkaMessage, key: string) => Promise<void>, topicName: string, message: KafkaMessage, context: KafkaContext): Promise<void>;
    produceKafkaResponse(serviceName: string, topic: string, message: KafkaMessage, key: string, processFn: (value: any, traceId: string) => Promise<any>): Promise<void>;
}
