export type KafkaMessage = {
    traceId: string;
    kafkaResponseKey?: string;
    kafkaResponseStatus?: boolean;
    [key: string]: any;
};
