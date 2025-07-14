import { KafkaMessage } from "../types/kafka";
export declare const decodeKafkaMessage: (message: any) => KafkaMessage;
export declare const encodeKafkaMessage: (className: string, value: KafkaMessage, key?: string) => {
    value: string;
    key: string;
};
export declare const generateTraceId: (profile: string) => string;
